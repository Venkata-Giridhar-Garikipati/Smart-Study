import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { generateNotesAiModel, GenerateQuizAiModel, GenerateStudyTypeContentAiModel } from "@/configs/AiModel";

// A simple example function
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { event, body: "Hello, World!" };
  },
);


// Function to create a new user
{/*export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;

    // Validate user data
    if (!user || !user.primaryEmailAddress?.emailAddress || !user.fullName) {
      console.error("Invalid user data:", user);
      throw new Error("Invalid user data");
    }

    console.log("Processing user:", user);

    try {
      // Check if user exists and create if not
      const resp = await step.run(
        "Check User and Create New if Not in DB",
        async () => {
          const existingUsers = await db
            .select()
            .from(USER_TABLE)
            .where(eq(USER_TABLE.email, user.primaryEmailAddress.emailAddress));

          if (existingUsers.length === 0) {
            // Add new user to DB
            const userResp = await db
              .insert(USER_TABLE)
              .values({
                name: user.fullName,
                email: user.primaryEmailAddress.emailAddress,
              })
              .returning({ id: USER_TABLE.id });

            console.log("New user created:", userResp);
            return { action: "created", user: userResp };
          }

          console.log("User already exists:", existingUsers[0]);
          return { action: "exists", user: existingUsers[0] };
        }
      );

      return resp;
    } catch (error) {
      console.error("Error in CreateNewUser function:", error);
      throw error; // Ensure errors are propagated for visibility
    }
  }
);
*/}

export const GenerateNotes = inngest.createFunction(
  {id:'generate-course'},
  {event:'notes.generate'},
  async({event,step})=>{
    const {course}=event.data;//all record info

    //Generate Notes formeach chapter of ai
    const notesResult = await step.run('Generate Chapter Notes',async()=>{
      const Chapters = course?.courseLayout?.chapters;
      let index = 0;
      Chapters.forEach(async (chapter) => {
        const PROMPT = 'Generate exam material detail content for each chapter Make sure to includes all topic print in the content, make sure to give content in HTML format (Do not Add HTMLK Head, Body, title tag), The chapters :'+JSON.stringify(chapter);
        const result = await generateNotesAiModel.sendMessage(PROMPT);
        const aiResp = result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId:index,
          courseId:course?.courseId,
          notes:aiResp
        })
        index=index+1;
      });
      return 'Completed'
    })
    //Update the status to 'Ready'
    const updateCourseStatusResult = await step.run('Update Course Status to Ready',async()=>{
      const result = await db.update(STUDY_MATERIAL_TABLE).set({
        status:'Ready'
      }).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
      return 'Success';
    })
  }
)

//generate flashcards,quiz,question and answers
export const GenerateStudyTypeContent = inngest.createFunction(
  {id:'Generate Study Type Content'},
  {event:'studyType.content'},

  async ({event,step})=>{
    const {studyType,prompt,courseId,recordId} = event.data;
      
    const AiResult = await step.run('Generating Flashcard using AI',async()=>{

      const result = await GenerateStudyTypeContentAiModel.sendMessage(prompt)
      
      studyType==='Flashcards'||'flashcards'||'Flashcard'||'flashcard' ?
      await GenerateStudyTypeContentAiModel.sendMessage(prompt):
      await GenerateQuizAiModel.sendMessage(prompt);
     // const AIResult = JSON.parse(result.response.text());
    // console.log('Raw Response:', result.response.text());

     //const cleanResponse = result.response.text().replace(/```json|```/g, '').trim();
     //const AIResult = JSON.parse(cleanResponse);

      //return AIResult
      try {
        // Get the raw response text
        const rawResponse = result.response.text();
        console.log('Raw Response:', rawResponse);
    
        // Remove markdown block markers
        const cleanResponse = rawResponse.replace(/```json|```/g, '').trim();
    
        // Parse the sanitized JSON string
        const AIResult = JSON.parse(cleanResponse);
    
        // Return the parsed JSON
        return AIResult;
    } catch (error) {
        console.error('Failed to parse response:', error);
        throw new Error('Invalid JSON format in API response');
    }
    

    })
    //save result

    const DbResult = await step.run('Save Result to DB',async()=>{
      try {
        const result = await db
          .update(STUDY_TYPE_CONTENT_TABLE)
          .set({
            content: JSON.stringify(AiResult),
            status: 'Ready',
          })
          .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));

        console.log('Database Update Result:', result);
        return 'Data Inserted Successfully';
      } catch (error) {
        console.error('Database update failed:', error);
        throw new Error('Failed to update the database.');
      }
    })
  }
)
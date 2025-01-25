{/*export async function POST(req) {
  try {
    const { user } = await req.json();

    if (!user) {
      return NextResponse.json({ error: "User data is required" }, { status: 400 });
    }

    const result = await inngest.send({
      name: "user.create",
      data: { user },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in POST /api/create-user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
  */}

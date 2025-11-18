import { NextRequest, NextResponse } from "next/server";

// -------------------------
// GET Webhook Handler
// -------------------------
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const params = req.nextUrl.searchParams;
    const id = params.get("id");

    console.log("GET request received");
    console.log("Query Params:", Object.fromEntries(params.entries()));

    return NextResponse.json(
      { message: "GET success", id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: error.message || "GET method failed" },
      { status: 500 }
    );
  }
};

// -------------------------
// POST Webhook Handler
// -------------------------
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const params = req.nextUrl.searchParams;
    const date = params.get("date");

    const body = await req.json();

    console.log("POST request received");
    console.log("Query Params:", Object.fromEntries(params.entries()));
    console.log("POST Body:", body);

    return NextResponse.json(
      {
        message: "POST success",
        params: Object.fromEntries(params.entries()),
        receivedBody: body
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: error.message || "POST method failed" },
      { status: 500 }
    );
  }
};

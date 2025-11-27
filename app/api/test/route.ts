import { NextRequest, NextResponse } from "next/server";

// ----------------------------------------------
// GET — Webhook Verification (Meta Challenge)
// ----------------------------------------------
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  console.log("get call receieved")

  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  const VERIFY_TOKEN = "YOUR_VERIFY_TOKEN"; // Change this

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response("Verification failed", { status: 403 });
}

// ----------------------------------------------
// POST — Incoming Webhook Events (Messages etc.)
// ----------------------------------------------
export async function POST(req: NextRequest) {
  try {
    console.log("post call receieved")
    const body = await req.json();
    console.log("📩 Webhook Event Received:", JSON.stringify(body, null, 2));


    // if(body?.entry[0]?.changes){
      console.log("webhook message--333--->",body?.entry[0]?.changes[0]?.value?.messages);
      console.log("webhook message--222--->",body?.entry[0]?.changes[0].value?.contacts);


    // }else{

    //   console.log("webhook post body----->",body);
    // }


    // Always return 200 OK, Meta requires it
    return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json({ error: "Webhook processing error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url, method, headers, body } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL
    let targetUrl: URL;
    try {
      targetUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Prepare headers for the target request
    const requestHeaders: HeadersInit = {
      "User-Agent": "Retro-API-Debugger/1.0",
      ...headers,
    };

    // Remove host header to avoid conflicts
    delete requestHeaders["host"];
    delete requestHeaders["origin"];
    delete requestHeaders["referer"];

    // Make the request to the target URL
    const response = await fetch(targetUrl.toString(), {
      method: method || "GET",
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Get response data
    const responseText = await response.text();
    let responseData: any;

    // Try to parse as JSON, fallback to text
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    // Get response headers
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      data: responseData,
      url: response.url,
      type: response.type,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        error: "Failed to make request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

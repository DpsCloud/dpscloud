import { createClient } from "../../../../../supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const error = requestUrl.searchParams.get("error");
    const redirect_to = requestUrl.searchParams.get("redirect_to");

    if (error) {
      console.error("OAuth error:", error);
      return NextResponse.redirect(new URL("/sign-in?error=oauth_error", requestUrl.origin));
    }

    if (!code) {
      console.error("No code provided");
      return NextResponse.redirect(new URL("/sign-in?error=no_code", requestUrl.origin));
    }

    const supabase = await createClient();
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (sessionError) {
      console.error("Error exchanging code for session:", sessionError);
      return NextResponse.redirect(new URL("/sign-in?error=session_error", requestUrl.origin));
    }

    // URL to redirect to after sign in process completes
    const redirectTo = redirect_to || "/dashboard";
    return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
  } catch (err) {
    console.error("Unexpected error in callback:", err);
    return NextResponse.redirect(new URL("/sign-in?error=unexpected", requestUrl.origin));
  }
}

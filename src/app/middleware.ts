import arcjet, { detectBot, shield } from '@arcjet/next'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*), "/"'])
 const aj = arcjet({
    //Add ts saftey for env  vars
    key:process.env.ARCJET_KEY!,
    rules:[
        shield({mode:"LIVE"}),
        detectBot({mode:"LIVE",allow:["CATEGORY:SEARCH_ENGINE","CATEGORY:MONITOR","CATEGORY:PREVIEW"]})

    ]
 
 })
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
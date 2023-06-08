export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
}

export default class HttpResponse extends Response {
  constructor(status: number, body: any) {
    super(JSON.stringify(body), { status, headers: { ...corsHeaders, 'content-type': 'application/json' } })
  }
}

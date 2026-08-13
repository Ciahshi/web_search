export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const type = url.searchParams.get('type') || 'search';

    if (!query) {
      return new Response(JSON.stringify({ error: 'Parameter "q" is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const SERPER_API_KEY = env.SERPER_API_KEY;

    
    let endpoint = 'https://google.serper.dev/search';
    if (type === 'images') {
      endpoint = 'https://google.serper.dev/images';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'X-API-KEY': SERPER_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ q: query })
      });

      if (!response.ok) throw new Error('Serper API error');

      const data = await response.json();

      let results = [];
      if (type === 'images') {
        results = data.images?.slice(0, 10).map(item => ({
          title: item.title || 'بدون عنوان',
          imageUrl: item.imageUrl,
          sourceUrl: item.sourceUrl,
          width: item.width,
          height: item.height,
          snippet: item.snippet || 'توضیحی موجود نیست'
        })) || [];
      } else {
        results = data.organic?.slice(0, 10).map(item => ({
          title: item.title,
          link: item.link,
          snippet: item.snippet,
          position: item.position,
          domain: item.domain
        })) || [];
      }

      const searchSummary = {
        query: query,
        type: type,
        totalResults: data.searchParameters?.totalResults || results.length,
        results: results
      };

      return new Response(JSON.stringify(searchSummary, null, 2), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Search failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};

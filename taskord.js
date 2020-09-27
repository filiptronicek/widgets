const requestBody = {
  query: `
        {
            tasks(first: 10, page: 1) {
                paginatorInfo {
                    count
                    currentPage
                    perPage
                }
                data {
                    task
                    user {
                        username
                        firstname
                        lastname
                    }
                }
            }
        }`,
};

const req = new Request("https://taskord.com/graphql");

req.method = "POST";
req.headers = {
  Authorization:
    "Bearer API_KEY",
};
req.body = requestBody;

const response = await req.loadJSON();

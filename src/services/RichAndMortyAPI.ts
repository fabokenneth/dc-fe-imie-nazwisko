export const getCharacters = async () =>
  await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
  characters(page: 1, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      id,
      name,
      species,
      gender,
      image
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data)
    })

<script setup>
const query = gql`
  query Pokemon($slug: String!) {
    pokemon(where: { slug: $slug }) {
      id
      nom
      slug
      description
      createdAt
      publishedAt
      updatedAt
      stage
      image {
        url(
          transformation: {
            image: { resize: { fit: crop, height: 1024, width: 1024 } }
            document: { output: { format: webp } }
          }
        )
      }
      typePokemon {
      nom
      id
      image {
        url
      }
      couleur {
        hex
      }
    }
    }
  }
`;

const pokemon = ref();
const route = useRoute();
const { data } = await useAsyncQuery(query, {
  slug: route.params.slug,
});
console.log(data.value);
pokemon.value = data.value.pokemon;
</script>

<template>
  <Head v-if="pokemon">
    <Title>{{ pokemon.nom }} - Détails du Pokémon</Title>
    <Meta
      name="description"
      :content="`Découvrez des détails sur ${pokemon.nom}: ${pokemon.description}`"
    />
    <Meta
      property="og:title"
      :content="`${pokemon.nom} - Détails du Pokémon`"
    />
    <Meta
      property="og:description"
      :content="`Découvrez des détails sur ${pokemon.nom}: ${pokemon.description}`"
    />
    <Meta property="og:image" :content="pokemon.image.url" />
    <Meta property="og:type" content="website" />
    <Meta property="og:locale" content="fr_FR" />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta
      name="twitter:title"
      :content="`${pokemon.nom} - Détails du Pokémon`"
    />
    <Meta
      name="twitter:description"
      :content="`Découvrez des détails sur ${pokemon.nom}: ${pokemon.description}`"
    />
    
    <Meta name="twitter:image" :content="pokemon.image.url" />
  </Head>

  <div v-if="pokemon" class="max-w-lg space-y-8 mx-auto">
    <NuxtImg class="" :src="pokemon.image.url" :alt="pokemon.nom" />
    <h2 class="text-3xl text-center flex space x-4 items-center">
      <div>
        {{ pokemon.nom }}
      </div>
      <img class="h-10 w-10 mx-3" :src="pokemon.typePokemon.image.url" />
    </h2>
    <div class="bg-gradient-to-br from-gray-800 to-gray-700 p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-xl max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-white mb-4">Description :</h1>

      <p class="text-justify text-white">{{ pokemon.description }}</p>
</div>
<footer class="p-10"></footer>
  </div>
  <div v-else>
    <li>Loading...</li>
  </div>
</template>
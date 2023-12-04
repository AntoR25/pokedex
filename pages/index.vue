<script setup>
const query = gql`
query Pokemons {
  pokemons(orderBy: numero_ASC) {
    createdAt
    description
    id
    nom
    publishedAt
    slug
    updatedAt
    image {
      url(
        transformation: {document: {output: {format: webp}}, image: {resize: {fit: crop, height: 256, width: 256}}}
      )
    }
    numero
  }
}
`;

const pokemons = ref();
const { data } = await useAsyncQuery(query);
console.log(data.value);
pokemons.value = data.value.pokemons;
</script>

<template>
  <div>
    <ul
      v-if="pokemons"
      class="bg-white bg-opacity-20 p-4 rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
    >
      <li v-for="pokemon in pokemons" :key="pokemon.id" class="flex flex-col items-center p-4 border border-gray-200 rounded-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
        <NuxtLink :to="`/pokemon/${pokemon.slug}`">
          <NuxtImg :src="pokemon.image.url" :alt="pokemon.nom" class="w-full h-40 object-cover rounded-md mb-4" />
          <h2 class="text-lg font-semibold text-gray-800">{{ pokemon.nom }}</h2>
        </NuxtLink>
      </li>
    </ul>
    <ul v-else>
      <li>Loading...</li>
    </ul>
  </div>
</template>
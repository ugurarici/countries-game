<template>
  <div>
    SCORE: <strong>{{ score }}</strong> / {{ $store.state.session.length }}
    <hr />
    <div v-if="country">
      <img :src="country.flags.svg" style="max-width: 100%" /><br />
      <div
        style="
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        "
      >
        <div
          v-for="(option, key) in options"
          :key="key"
          @click.prevent="optionSelected(key)"
          style="
            background-color: #ccc;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.2rem;
            cursor: pointer;
          "
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  Vuex içerisinde 250 ülke verisi bulunuyor (state.countries)
//  oyunun her bir turunda, ülkelerden 1 adedi rastgele seçilir
//  turun amacı yazılımın seçmiş olduğu ve bayrağını ekranda göstereceği ülkenin adını
//      aşağıda belirtilen seçenekler arasından belirleyebilmektedir
//  seçeneklerde doğru şıkkın haricinde en az 3 adet daha üle ismi görünmesi gerekmektedir
//  yazılım soruyu ekrana çizmeden önce, doğrusunun haricinde 3 rastgele ülke ismi daha getirir
//  seçenekler haline gelen bu 4 isim karıştırılır ve soru, bayrak ve seçenekler şeklinde ekrana getirilir
//  seçeneklerden herhangi biri tercih edildiğinde, oyuncunun tercihi kontrol edilir
//  seçilen seçenek, en başta getirilmiş ve bayrağı gösterilen ülkenin adı ise yanıt doğru kabul edilir
//  doğru yanıt verildiyse puan (state.score) artırılır
//  böylece tur tamamlanmış olur ve bir sonraki tura geçilir
//  her tur aynı şekilde işler

var _ = require("lodash");

export default {
  data() {
    return {
      country: null,
      options: [],
    };
  },
  computed: {
    countries() {
      return this.$store.state.countries;
    },
    score() {
      return this.$store.state.score;
    },
  },
  methods: {
    selectARandomCountry() {
      const randIndex = Math.floor(Math.random() * this.countries.length);
      return this.countries[randIndex];
    },
    setupGameTour() {
      var randomCountry = this.selectARandomCountry();
      this.country = randomCountry;
      this.options = [];
      this.options.push(randomCountry.name.common);

      for (let index = 0; index < 3; index++) {
        console.log("hop");
        randomCountry = this.selectARandomCountry();
        if (this.options.indexOf(randomCountry.name.common) == -1) {
          this.options.push(randomCountry.name.common);
        } else {
          index--;
        }
      }

      this.options = _.shuffle(this.options);
    },
    optionSelected(key) {
      if (this.options[key] == this.country.name.common) {
        console.log("GERÇEKTEN DE DOĞRU CEVAP!");
        this.$store.commit("incrementScore");
        this.$confetti.start();
        setTimeout(() => {
          this.$confetti.stop();
        }, 500);
      } else {
        console.log("olmadı be");
      }
      this.$store.commit("pushToSession", {
        country: this.country,
        options: this.options,
        selectedOption: this.options[key],
      });
      this.setupGameTour();
    },
  },
  beforeMount() {
    if (this.countries.length < 1) {
      this.$router.push("/");
    } else {
      this.setupGameTour();
    }
  },
};
</script>
<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" xs="12" sm="6">
        <p>Enter details from <strong>LB Facebook Page</strong> today here</p>
        <v-textarea
          clearable
          clear-icon="mdi-close-circle"
          color="primary"
          outlined
          :value="input"
          @input="update"
        ></v-textarea>
      </v-col>
      <v-col cols="12" xs="12" sm="6">
        <h3>Information Distribution</h3>
        <v-divider></v-divider>

        <v-container class="text-left">
          <template v-if="input.length">
            <p>
              Total active cases today:
              {{ totalPatientsCount }}
            </p>
            <p>Total expired patients: {{ totalExpiredPatients }}</p>
            <p>
              Works outside LB: {{ worksOutsideLBCount }}/{{
                totalPatientsCount
              }}
            </p>

            Count of Added Cases in:
            <p v-if="countAnos">Anos: {{ countAnos }}</p>
            <p v-if="countBagongSilang">
              Bagong Silang: {{ countBagongSilang }}
            </p>
            <p v-if="countBambang">Bambang: {{ countBambang }}</p>
            <p v-if="countBatongMalake">
              Batong Malake: {{ countBatongMalake }}
            </p>
            <p v-if="countBaybayin">Baybayin: {{ countBaybayin }}</p>
            <p v-if="countBayog">Bayog: {{ countBayog }}</p>
            <p v-if="countLalakay">Lalakay: {{ countLalakay }}</p>
            <p v-if="countMaahas">Maahas: {{ countMaahas }}</p>
            <p v-if="countMalinta">Malinta: {{ countMalinta }}</p>
            <p v-if="countMayondon">Mayondon: {{ countMayondon }}</p>
            <p v-if="countSanAntonio">San Antonio: {{ countSanAntonio }}</p>
            <p v-if="countTadlac">Tadlac: {{ countTadlac }}</p>
            <p v-if="countTimugan">Timugan: {{ countTimugan }}</p>
            <p v-if="countTuntunginPutho">
              Tuntungin Putho: {{ countTuntunginPutho }}
            </p>
            <p v-if="countBJMP">BJMP: {{ countBJMP }}</p>
          </template>
          <template v-else>
            <p class="font-italic">No entered details yet</p>
          </template>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Home',
  data: () => ({
    input: '',
    worksOutsideLBCount: 0,
    totalPatientsCount: 0,
    totalExpiredPatients: 0,

    countAnos: 0,
    countBagongSilang: 0,
    countBambang: 0,
    countBatongMalake: 0,
    countBaybayin: 0,
    countBayog: 0,
    countLalakay: 0,
    countMaahas: 0,
    countMalinta: 0,
    countMayondon: 0,
    countSanAntonio: 0,
    countTadlac: 0,
    countTimugan: 0,
    countTuntunginPutho: 0,
    countBJMP: 0
  }),

  methods: {
    setCountBrgy: function(brgy) {
      switch (brgy) {
        case 'Anos':
          this.countAnos++
          break
        case 'Bagong Silang':
          this.countBagongSilang++
          break
        case 'Bambang':
          this.countBambang++
          break
        case 'Batong Malake':
          this.countBatongMalake++
          break
        case 'Baybayin':
          this.countBaybayin++
          break
        case 'Bayog':
          this.countBayog++
          break
        case 'Lalakay':
          this.countLalakay++
          break
        case 'Maahas':
          this.countMaahas++
          break
        case 'Malinta':
          this.countMalinta++
          break
        case 'Mayondon':
          this.countMayondon++
          break
        case 'San Antonio':
          this.countSanAntonio++
          break
        case 'Tadlac':
          this.countTadlac++
          break
        case 'Timugan':
          this.countTimugan++
          break
        case 'Tuntungin-Putho':
          this.countTuntunginPutho++
          break
        case 'BJMP':
          this.countBJMP++
          break
        default:
      }
    },
    resetAllCounts: function() {
      this.worksOutsideLBCount = 0
      this.totalPatientsCount = 0
      this.totalExpiredPatients = 0
      this.countAnos = 0
      this.countBagongSilang = 0
      this.countBambang = 0
      this.countBatongMalake = 0
      this.countBaybayin = 0
      this.countBayog = 0
      this.countLalakay = 0
      this.countMaahas = 0
      this.countMalinta = 0
      this.countMayondon = 0
      this.countSanAntonio = 0
      this.countTadlac = 0
      this.countTimugan = 0
      this.countTuntunginPutho = 0
      this.countBJMP = 0
    },

    update: _.debounce(function(e) {
      if (e) {
        this.resetAllCounts()

        const lines = e
        const splitLines = lines.split('\n')

        let patientDetails = {}
        let totalPatients = []

        for (let i = 0; i < splitLines.length; i++) {
          if (splitLines[i].match(/LB C/g)) {
            patientDetails['patientCode'] = splitLines[i]
            patientDetails['location'] = splitLines[i + 2]
            this.setCountBrgy(splitLines[i + 2])
            // start object creation
          } else if (splitLines[i].match(/Works outside of LB/g)) {
            this.worksOutsideLBCount++
          } else if (splitLines[i].match(/Expired/g)) {
            this.totalExpiredPatients++
          } else if (splitLines[i].match(/Contact Tracing done/g)) {
            totalPatients.push(patientDetails)
            patientDetails = {}
            // push the created object
            // clear the created object
          }
        }

        // console.log('totalPatients:', totalPatients)
        // console.log('total count Patients:', totalPatients.length)
        // console.log('works outside LB:', this.worksOutsideLBCount)
        this.totalPatientsCount =
          totalPatients.length - this.totalExpiredPatients

        this.input = e
        console.log('this.input:', this.input)
      } else this.input = ''
    }, 300)
  }
}
</script>

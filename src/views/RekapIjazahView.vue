<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col text-center">
        <h4>
          Rekapitulasi Fiksasi Biodata Siswa Untuk Ijazah Tahun Ajaran 2022/2023
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="table-responsive">
          <table class="table table-dark table-striped table-hover mt-3">
            <thead style="font-weight: bold">
              <tr>
                <td align="center">No.</td>
                <td align="center">Kelas</td>
                <td align="center">Jumlah Siswa</td>
                <td align="center">Selesai Dicek</td>
                <td align="center">Persentase</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(kelases, index) in kelas" :key="kelases.id">
                <td align="center">{{ index + 1 }}</td>
                <td align="center">{{ kelases.kelas }}</td>
                <td align="center">{{ kelases.count }}</td>
                <td align="center">{{ kelases.cekcount }} Siswa</td>
                <td align="center">{{ persentase[index] }} %</td>
              </tr>
              <tr>
                <td align="center"></td>
                <td align="center">Total</td>
                <td align="center">{{total}}</td>
                <td align="center">{{totalDicek}} Siswa</td>
                <td align="center">{{totalPersentase2}} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import { API_URL } from "../components/Url";

export default {
  name: "RekapIjazahView",
  data() {
    return {
      kelas: [],
      persentase: [],
      total:0,
      totalDicek:0,
      totalPersentase:0,
      totalPersentase2:0,
    };
  },
  mounted() {
    axios
      .get(API_URL + "getIjazahByKelas")
      .then((response) => {
        this.kelas = response.data;
        //cari persentase
        for(var i=0;i < this.kelas.length ; i++){
            this.persentase[i] = parseFloat((this.kelas[i].cekcount / this.kelas[i].count) * 100).toFixed(2);
            this.total = this.total + this.kelas[i].count;
            this.totalDicek = this.totalDicek + parseInt(this.kelas[i].cekcount) ;
            this.totalPersentase = parseFloat(this.totalPersentase + this.persentase[i]).toFixed(2);
        }
        // this.totalPersentase2 = totalPersentase / this.kelas.length;
        this.totalPersentase2 = parseFloat(this.totalPersentase / this.kelas.length).toFixed(2);
      // })
      })
      .catch();
  },
};
</script>

<style></style>

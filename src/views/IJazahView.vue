<template>
  <div class="mt-4 ml-2 mr-2">
    <div class="row">
      <div class="col">
        <div class="row g-3 align-items-center">
          <div class="col-auto">
            <label for="form-control">Kelas</label>
          </div>
          <div class="col-auto">
            <select
              class="form-control"
              @change="pilihanKelas(kelasku)"
              v-model="kelasku"
            >
              <option v-for="combos in combo" :key="combos.id">
                {{ combos.kelas }}
              </option>
            </select>
          </div>
          <div class="col-auto">
            <router-link class="btn btn-info" to="/rekapijazah"><b-icon-archive></b-icon-archive> Rekapitulasi</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- tabel disini  -->
    <div class="row mt-3">
      <div class="col">
        <div class="table-responsive">
          <table
            class="table table-striped table-hover"
            style="font-size: small"
          >
            <thead style="font-weight: bold">
              <tr>
                <td>No.</td>
                <td>NIS</td>
                <td>NISN</td>
                <td>Nama</td>
                <td>Tempat, Tanggal Lahir</td>
                <td>Nama Orang Tua/ Wali</td>
                <td>Edit</td>
                <td>Selesai</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(biodatas, index) in biodata" :key="biodatas.id">
                <td>{{ index + 1 }}</td>
                <td>{{ biodatas.nis }}</td>
                <td>{{ biodatas.nisn }}</td>
                <td>{{ biodatas.nama }}</td>
                <td>{{ biodatas.ttl }}</td>
                <td>{{ biodatas.ortu }}</td>
                <td align="center">
                  <button
                    style="border: transparent; background-color: transparent"
                    @click="setIjazahToEdit(biodatas.id)"
                    v-b-modal.modal-1
                  >
                    <b-icon-pencil-square></b-icon-pencil-square>
                  </button>
                </td>
                <td align="center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="biodatas.id"
                    id="flexCheckDefault"
                    v-model="selesai[index]"
                    @click="ubahStatus(selesai[index],biodatas.id)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--  -->
    <!-- modal edit biodata  -->
    <div>
      <b-modal
        id="modal-1"
        title="Edit Biodata Ijazah"
        ref="modalku"
        hide-footer
      >
        <form class="" v-on:submit.prevent>
          <div class="form-group">
            <input type="hidden" class="form-control" v-model="id" />
            <label for="nis">NIS</label>
            <input type="number" class="form-control" v-model="nis" />
          </div>
          <div class="form-group">
            <label for="nisn">NISN</label>
            <input type="text" class="form-control" v-model="nisn" />
          </div>
          <div class="form-group">
            <label for="nama">NAMA</label>
            <input type="text" class="form-control" v-model="nama" />
          </div>
          <div class="form-group">
            <label for="ttl">Tempat, Tanggal Lahir</label>
            <input type="text" class="form-control" v-model="ttl" />
          </div>
          <div class="form-group">
            <label for="ortu">Orang Tua, Wali</label>
            <input type="text" class="form-control" v-model="ortu" />
          </div>
          <button class="btn btn-success btn-sm" @click="editIjazah">
            <b-icon-pencil-fill></b-icon-pencil-fill> Edit
          </button>
        </form>
      </b-modal>
    </div>
    <!-- selesai   -->
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "../components/Url";
import swal from "sweetalert";

export default {
  name: "IjazahView",
  data() {
    return {
      biodata: [],
      biodataForEdit: [],
      combo: [],
      kelasku: "",
      id: "",
      nis: "",
      nisn: "",
      nama: "",
      ttl: "",
      ortu: "",
      selesai:[]
    };
  },
  methods: {
    pilihanKelas(val) {
      // untuk tabel
      axios
        .get(API_URL + "ijazah/" + val)
        .then((response) => {
          this.biodata = response.data;
          for(var i = 0;i < this.biodata.length;i++){
            this.selesai[i] = this.biodata[i].selesai;
          }
        })
        .catch();
    },
    setIjazahToEdit(val) {
      axios
        .post(API_URL + "ijazahForEdit/", { id: val })
        .then((response) => {
          //   console.log(response.data.kelas);
          this.id = response.data.id;
          this.nis = response.data.nis;
          this.nisn = response.data.nisn;
          this.nama = response.data.nama;
          this.ttl = response.data.ttl;
          this.ortu = response.data.ortu;
        })
        .catch();
    },
    editIjazah() {
      axios
        .put(API_URL + "ijazah/" + this.id, {
          nis: this.nis,
          nisn: this.nisn,
          nama: this.nama,
          ttl: this.ttl,
          ortu: this.ortu,
        })
        .then(() => {
          swal("Selamat", "Data Ijazah Sudah Dirubah", "success", {
            timer: 2000,
            button: false,
          });
          //   update tabel
          axios
            .get(API_URL + "ijazah/" + this.kelasku)
            .then((response) => {
              this.biodata = response.data;
              //   console.log(this.biodata);
            })
            .catch();
        })
        .catch();
      this.$refs["modalku"].hide();
    },
    ubahStatus(status,idk){
        axios
        .post(API_URL+"ubahStatusIjazah",{
            id:idk
        })
        .then((response) => {
            // console.log(response);
            swal("Selamat", "Status Telah Berhasil Diubah", "success", {
            timer: 2000,
            button: false,
          });
        })
        .catch()
    }
  },
  mounted() {
    axios
      .get(API_URL + "ijazahCombo")
      .then((response) => {
        this.combo = response.data;
      })
      .catch();
  },
};
</script>

<style></style>

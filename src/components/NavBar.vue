<template lang="">
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>        
        <b-navbar-brand href="#"><img src="../assets/images/simbiosis-logo2.png" width="30px" height="30px" class="mr-2"/>SIMBIOSIS</b-navbar-brand>
        <b-nav-item to="/">Home</b-nav-item>
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Fitur" right>
          <b-dropdown-item to="/ijazah">Biodata UntuK Ijazah</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <span style="color:white" class="ml-auto">Versi 1.0</span>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "NavBar",
};
</script>
<style lang=""></style>

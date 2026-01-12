<template>
    <div class="sidebar w-[250px] h-full flex flex-col items-center bg-[#F6F6F6]">
        <img src="../../assets/project_logo.svg" alt="" class="w-[153.22px] h-[44.2px] mt-10">
        <div class="sidebar_menu mt-[80.8px] flex flex-col gap-[30px] mb-[80.8px]">
            <RouterLink to="/admin/dashboard"><div>
                <div>
                    <img src="../../assets/Admin_icons/SideBar/dashboard.svg" alt="">
                </div>
                <button>Dashboard</button>
            </div>
            </RouterLink>
            <RouterLink to="/admin/products"><div>
                <div>
                    <img src="../../assets/Admin_icons/SideBar/products.svg" alt="">
                </div>
                <button>Products</button>
            </div>
            </RouterLink>
            <RouterLink to="/admin/orders"><div>
                <div>
                    <img src="../../assets/Admin_icons/SideBar/orders.svg" alt="">
                </div>
                <button>Orders</button>
            </div>
            </RouterLink>
            <RouterLink to="/admin/customers"><div>
                <div>
                    <img src="../../assets/Admin_icons/SideBar/customers.svg" alt="">
                </div>
                <button>Customers</button>
            </div>
            </RouterLink>
            <RouterLink to="/admin/promotions"><div>
                <div>
                    <img src="../../assets/Admin_icons/SideBar/promotions.svg" alt="">
                </div>
                <button>Promotions</button>
            </div>
            </RouterLink>
        </div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'SideBar',
    }
</script>

<style scoped>
    .sidebar_menu div {
        width: 186px;
        height: 41px;
        border: none;
        border-radius: 5px;
        background-color: white;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 14px;
        color: #000000;
        text-align: center;

        display: flex;
        align-items: center;
        padding-left: 10px;
        gap: 20px;
    }

    .sidebar_menu div:hover,
    .sidebar_menu div:hover div {
        background-color: #CBDAAF;
        cursor: pointer;
    }

    .sidebar_menu div button {
        border: none;
        background-color: transparent;
    }

    .sidebar_menu div div {
        width: 24px;
        height: 24px;
        padding: 0px;
    }

    .sidebar_menu a.router-link-active div,
    .sidebar_menu a.router-link-active div div {
        background-color: #CBDAAF;
    }
</style>
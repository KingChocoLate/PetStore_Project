<template>
    <div class="w-full">
        <AdminNavigation title="Dashboard" name="John Doe"/>
        <div class="flex flex-col w-full px-[30px]">
            <div class="summary_display flex justify-between mt-5">
                <Summary 
                    v-for="(item, index) in imageList" 
                    :key="index" 
                    :title="item.title" 
                    :icon="item.icon"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import SideBar from '@/components/Admin/SideBar.vue';
    import AdminNavigation from '@/components/Admin/AdminNavigation.vue';
    import Summary from '@/components/Admin/Summary.vue';
    import summary_sales from '../../assets/Admin_icons/sales.svg';
    import summary_orders from '../../assets/Admin_icons/summary_orders.svg';
    import summary_products from '../../assets/Admin_icons/SideBar/products.svg';
    import summary_customers from '../../assets/Admin_icons/summary_customers.svg';
    export default {
        name: 'Dashboard',
        components: {
            SideBar,
            AdminNavigation,
            Summary
        },
        data() {
            return {
                imageList: [
                    {title: 'Total sales', icon: summary_sales}, 
                    {title: 'Total orders', icon: summary_orders}, 
                    {title: 'Total products', icon: summary_products}, 
                    {title: 'Total customers', icon: summary_customers}
                ]
            }
        }
    }
</script>
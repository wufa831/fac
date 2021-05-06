import { defineComponent, onMounted, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import menu from '@/config/menu';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const openKeys = ref([]);//就是绑定的:key
    const selectedKeys = ref([]);//就是绑定的:key

    onMounted(() => {
      selectedKeys.value = [route.path];
    });

    const to = (url) => {
      router.push(url);
    };

    return {
      openKeys,
      selectedKeys,
      menu,
      to,
    };
  }
});
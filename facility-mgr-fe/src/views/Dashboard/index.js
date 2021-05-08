import { defineComponent, onMounted, ref } from 'vue';
import { result } from '@/helpers/utils';
import Facilities from '@/views/Facilities/index.vue';
import Log from '@/views/Log/index.vue';
import { dashboard } from '@/service';


export default defineComponent({
  components: {
    Facilities,
    Log,
  },
  setup() {
    const loading = ref(true);

    const baseInfo = ref({
      total: {
        facility: 0,
        user: 0,
        log: 0,
      },
    });

    const getBaseInfo = async () => {
      loading.value = true;
      const res = await dashboard.baseInfo();
      loading.value = false;

      result(res)
        .success(({ data }) => {
          baseInfo.value = data;
        });
    };

    onMounted(() => {
      getBaseInfo();
    });

    return {
      baseInfo,
      loading,

    };
  },
});

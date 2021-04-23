import { defineComponent,ref,onMounted} from 'vue';
import { user } from '@/service';
import { message } from "ant-design-vue";
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';

const columns = [
  {
    title: '账户',
    dataIndex:'account',
  },
  {
    title: '创建日期',
    slots: {
      customRender:'createdAt',//此处在出入库章节需要修改
    },
  },
  {
    title: '操作',
    slots: {
      customRender:'actions',//此处在出入库章节需要修改
    },
  },
];

export default defineComponent({
  components: {
    AddOne,
  },
  setup() {
    const showAddModal = ref(false);
    const list = ref([]);//列表用来放拿到的用户信息
    const total = ref(0);
    const curPage = ref(1);
    const keyword = ref('');
    const isSearch = ref(false);

    const getUser = async() => {
      const res = await user.list(
        curPage.value,
        10,
        keyword.value,
      );

      result(res)
        .success(({ data:{list: resList, total: resTotal}}) => {
          list.value = resList;
          total.value = resTotal;
        });
    };

    onMounted(() => {
      getUser();
    });

    const setPage = (page) => {
      curPage.value = page;

      getUser();
    };

    const onSearch = () => {
      getUser();
      isSearch.value = Boolean(keyword.value);
    };

    const backAll = () => {
      keyword.value = '';
      getUser();
      isSearch.value = false;
    };
    //调用暴露出来的删除接口的方法（service中写好的remove）
    const remove = async ({_id}) => {
      const res = await user.remove(_id);

      result(res)
        .success(({msg}) => {
          message.success(msg);
          getUser();//删除后重新显示 
        });
    };

    const resetPassword = async({_id}) => {
      const res=await user.resetPassword(_id);
      result(res)
        .success(({msg}) => {
          message.success(msg);
          //getUser();//删除后重新显示 
        });
    };

    return {
      list,
      total,
      curPage,
      columns,
      formatTimestamp,
      remove,
      showAddModal,
      getUser,
      setPage,
      resetPassword,
      onSearch,
      backAll,
      isSearch,
      keyword,
    };                                                                                                                                                          
  },
});
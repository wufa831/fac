import { defineComponent, ref,onMounted,watch } from 'vue';
import { message } from 'ant-design-vue';
import { log } from '@/service';
import { result, formatTimestamp } from '@/helpers/utils';
import { LOG_MAP } from '@/helpers/log';
import { getLogInfoByPath } from '@/helpers/log';
export default defineComponent({
  components: {

  },
  setup() {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'user.account',
      },

      {
        title: '访问地址',
        dataIndex: 'request.url',
      },
      {
        title: '动作',
        dataIndex: 'action',
      },
      {
        title: '创建日期',
        slots: {
          customRender:'createdAt',//此处在出入库章节需要修改
        },
      },
      
    ];
    
    const show = ref(false);//控制页面是否显示，用props
    const showedit = ref(false);
    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const keyword1 = ref('');
    const keyword2 = ref('');
    const isSearch = ref(false);
    const loading = ref(true);

//获取设备列表
    const getList = async () => {
      loading.value = true;
      const res = await log.list(
        curPage.value,
        20,
        keyword1.value,
        keyword2.value
        // keyword1:keyword1.value,
        // keyword2:keyword2.value,
      );
      loading.value = false;
      result(res)
        .success(({ data:{list: l, total: t} }) => {
          l.forEach((item) => {
            item.action = getLogInfoByPath(item.request.url);
          });
          list.value = l;
          total.value = t;
        });
    }

    const handleChange =async () => {
      const res = await log.list(
        curPage.value,
        20,
        keyword1.value,
        keyword2.value
      );
      
      result(res)
        .success(({ data:{list: l, total: t} }) => {
          l.forEach((item) => {
            item.action = getLogInfoByPath(item.request.url);
          });
          list.value = l;
          total.value = t;
          isSearch.value = true;
        });
    };


    onMounted(async() => {
      getList();
    });//生命周期的函数的钩子,当组件被挂载在页面上显示出的时候做什么事情
    //设置页码
    const setPage = (page) => {
      curPage.value = page;

      getList();
    };
//触发搜索
    const onSearch = () => {
      getList();
      isSearch.value = Boolean(keyword1.value||keyword2.value);
    };
//返回主页面   
    const backAll = () => {
      keyword1.value = '';
      keyword2.value = '';
      getList();
      isSearch.value = false;
    };
//删除一个设备

    

 
    return {
      columns,
      show,
      list,
      loading,
  
      curPage,
      total,
      setPage,

      keyword1,
      keyword2,
      onSearch,
      backAll,
      isSearch,

      formatTimestamp,

      LOG_MAP,

      handleChange,

    };
  },

});
import { defineComponent, ref,onMounted } from 'vue';
import AddOne from './AddOne/index.vue';
import EditOne from './EditOne/index.vue';
import { message } from 'ant-design-vue';
import { facility,state } from '@/service';
import { result,formatTimestamp } from '@/helpers/utils';
export default defineComponent({
  components: {
    AddOne,
    EditOne,
  },
  setup() {
    const columns = [
      {
        title: '设备厂商',
        dataIndex: 'vendor',
      },
      {
        title: 'IMEI号',
        dataIndex: 'IMEI',
      },
      {
        title: 'ICCID串号',
        dataIndex: 'ICCID',
      },
      {
        title: 'SN号',
        dataIndex: 'SN',
      },
      {
        title: '客户名称',
        dataIndex: 'custom',
      },
      {
        title: '设备状态',
        dataIndex: 'state',
      },
      {
        title: '场景属性',
        dataIndex: 'scene',
      },
      {
        title: '安装行政区',
        dataIndex: 'area',
      },
      {
        title: '激活时间',
        dataIndex: 'activeTime',
        slots: {
          customRender:'activeTime',
        },
      },
      {
        title: '操作',
        slots: {
          customRender:'actions',
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
    const curFacility = ref({});
    let list1 = ref([]);
    let list2 = ref([]);
    const loading = ref(true);

    const getScene = async () => {
      loading.value = true;
      const res = await state.list();
      loading.value = false;
      result(res)
        .success(({ data }) => {
          list1 = data.list;
          for (let i = 0; i < list1.length; i++) {
            list2.value[i] = list1[i].statename;
          };
         
          
        });
    };

//获取设备列表
    const getList = async () => {
      const res = await facility.list({
        page: curPage.value,
        size: 10,
        keyword1: keyword1.value,
        keyword2:keyword2.value,
      });
      
      result(res)
        .success(({ data }) => {
          const { list: l, total: t } = data;
          list.value = l;
          total.value = t;
        });
    }

    onMounted(async () => {
      await getScene();
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

    const remove = async ({text:record}) => {
      //拿到表格每一行的记录
      const { _id } = record;
      // 拿到这一行的id
      const res = await facility.remove(_id);
      //向服务端发送http请求，删除之后返回res数据
      //result方法处理返回的值
      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getList();
        });
    };

    const update = async({record}) => {
     
      curFacility.value = record;

    };

    const updatecurFacility = (newData) => {
      Object.assign(curFacility.value, newData);
    };


    const onUploadChange = ({ file }) => {
      if (file.response) {
        result(file.response)
          .success(async (key) => {
            
            const res = await facility.addMany(key);
            
            result(res)
              .success(({ data: { addCount } }) => {
                message.success(`成功添加 ${addCount} 台设备`);

                getList();
              });
          });
      }
    };

    return {
      columns,
      show,
      list,
      formatTimestamp,
      curPage,
      total,
      setPage,
      keyword1,
      keyword2,
      onSearch,
      backAll,
      isSearch,
      remove,
      showedit,
      update,
      curFacility,
      updatecurFacility,
      getList,
      getScene,
      loading,
      list2,
      onUploadChange,
    };
  },

});
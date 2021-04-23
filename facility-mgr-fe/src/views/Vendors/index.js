import { defineComponent, ref,onMounted } from 'vue';
import AddOne from './AddOne/index.vue';
import { message } from 'ant-design-vue';
import { vendor } from '@/service';
import { result,formatTimestamp } from '@/helpers/utils';
export default defineComponent({
  components: {
    AddOne,
  },
  setup() {
    const columns = [
      {
        title: '厂商名称',
        dataIndex: 'vendorname',
      },
      {
        title: '供应商编号',
        dataIndex: 'no',
      },
      {
        title: '联系人',
        dataIndex: 'contact',
      },
      {
        title: '联系方式',
        dataIndex: 'tel',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      
      {
        title: '创建时间',
        slots: {
          customRender:'createdAt',
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

    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const keyword = ref('');
    const isSearch = ref(false);

//获取设备列表
    const getVendor = async () => {

      const res = await vendor.list(
        {
          page: curPage.value,
          size: 10,
          keyword:keyword.value,
        }
      );
      
      result(res)
        .success(({ data }) => {
          const { list:l, total:t } = data;
          list.value = l;
          total.value = t;
        });
    }

    onMounted(async () => {
      // getList();
      getVendor();
    
    });
 
    const setPage = (page) => {
      curPage.value = page;

      getVendor();
    };


//触发搜索
    const onSearch = () => {
      getVendor();
      isSearch.value = Boolean(keyword.value);
    };
//返回主页面   
    const backAll = () => {
      keyword.value = '';
      getVendor();
      isSearch.value = false;
    };
//删除一个设备

    const remove = async ({text:record}) => {
      //拿到表格每一行的记录
      const { _id } = record;
      // 拿到这一行的id
      const res = await vendor.remove(_id);
      //向服务端发送http请求，删除之后返回res数据
      //result方法处理返回的值
      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getVendor();
        });
    };

    return {
      columns,
      show,
      list,
      formatTimestamp,
      curPage,
      total,
      setPage,
      keyword,
      onSearch,
      backAll,
      isSearch,
      getVendor,
      remove,
    };
  },

});
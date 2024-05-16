<template>
  <!-- 搜索工作栏 -->
  <ContentWrap>
    <el-form
      ref="queryFormRef"
      :inline="true"
      :model="queryParams"
      class="-mb-15px"
      label-width="68px"
    >
      <el-form-item label="接口名称" prop="name">
        <el-input
          v-model="queryParams.name"
          class="!w-240px"
          clearable
          placeholder="请输入接口名称"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="鉴权状态" prop="status">
        <el-select
          v-model="queryParams.status"
          class="!w-240px"
          clearable
          placeholder="请选择接口授权状态"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.COMMON_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery">
          <Icon class="mr-5px" icon="ep:search" />
          搜索
        </el-button>
        <el-button @click="resetQuery">
          <Icon class="mr-5px" icon="ep:refresh" />
          重置
        </el-button>
        <el-button plain type="danger" @click="toggleExpandAll">
          <Icon class="mr-5px" icon="ep:sort" />
          展开/折叠
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="list"
      :default-expand-all="isExpandAll"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column :show-overflow-tooltip="true" label="名称" prop="name" width="250" />
      <el-table-column label="接口类型" prop="method" width="80">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.SYSTEM_FUNCTION_TYPE" :value="scope.row.method" />
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="路径" prop="id" width="300" />
      <el-table-column :show-overflow-tooltip="true" label="包名称" prop="className" width="500" />
      <el-table-column label="鉴权" prop="token" width="100">
        <template #default="scope">
              <el-switch
                v-model="scope.row.token"
                :active-value="1"
                :inactive-value="0"
                @change="handleTokenChange(scope.row)"
              />
            </template>
      </el-table-column>
    </el-table>
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <MenuForm ref="formRef" @success="getList" />
</template>
<script lang="ts" setup>
import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
import { handleTree } from '@/utils/tree'
import * as FunctionApi from '@/api/system/function'
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'

defineOptions({ name: 'SystemMenu' })

const { wsCache } = useCache()
const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const loading = ref(true) // 列表的加载中
const list = ref<any>([]) // 列表的数据
const queryParams = reactive({
  name: undefined,
  status: undefined
})
const queryFormRef = ref() // 搜索的表单
const isExpandAll = ref(false) // 是否展开，默认全部折叠
const refreshTable = ref(true) // 重新渲染表格状态

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    list.value = await FunctionApi.getFunctionList(queryParams)
    // console.log("dd", JSON.stringify(list.value, null, 2))
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()

/** 展开/折叠操作 */
const toggleExpandAll = () => {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    refreshTable.value = true
  })
}

/** 修改用户状态 */
const handleTokenChange = async (row: any) => {
  try {
    // 修改状态的二次确认
    const text = row.token === 1 ? '启用' : '停用'
    await message.confirm('确认要"' + text + '吗')
    // 发起修改状态
    await FunctionApi.updateTokenStatus(row)
    // 刷新列表
    await getList()
  } catch {
    // 取消后，进行恢复按钮
    row.token =
      row.token === 1 ? 0 : 1
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>

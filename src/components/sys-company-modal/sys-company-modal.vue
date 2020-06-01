<!--
 vue description

 @author zhanghui
 @date 2019-12-23
 @company Dingxuan
!-->
<template>
  <div>
    <Modal v-model="modalVisiable" :styles="{top: '10px'}" draggable width="500">
      <p slot="header">
        <span>
          机构-{{ title }}
        </span>
      </p>
      <div>
        <Form ref="modalForm" :model="modalForm" :rules="modalRule" :label-width="90">
          <FormItem label="机构全称:" prop="fullName">
            <span v-if="readOnly">{{ modalForm.fullName }}</span>
            <Input v-else v-model="modalForm.fullName" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="机构简称:" prop="name">
            <span v-if="readOnly">{{ modalForm.name }}</span>
            <Input v-else v-model="modalForm.name" placeholder=" " class="input-width-300px"></Input>
          </FormItem>
          <FormItem label="状态:" prop="status">
            <span v-if="readOnly">{{ modalForm.status }}</span>
            <RadioGroup v-else v-model="modalForm.status">
              <Radio v-for="item in statusOptions" :label="item.label"/>
            </RadioGroup>
          </FormItem>
          <FormItem label="机构排序:" prop="companyOrder">
            <InputNumber :max="10000" :min="0" v-model="modalForm.companyOrder" style="width: 300px;"/>
          </FormItem>
          <FormItem label="所属区域:" prop="area">
            <span v-if="readOnly">{{ modalForm.area }}</span>
            <AreaSelect v-else :width="300" :area="modalForm.area" @udpate-area="areaChangeHandle"/>
          </FormItem>
          <FormItem label="详细地址:" prop="address">
            <span v-if="readOnly">{{ modalForm.address }}</span>
            <Textarea :content="modalForm.address" :width="300" @update-textarea="addressChangeHandle"/>
          </FormItem>
        </Form>
      </div>
      <ModalFooter
        slot="footer"
        :read-only="readOnly"
        :submit-loading="submitLoading"
        @cancel="modalVisiable = false"
        @submit="modalSubmitHandle"
      />
    </Modal>
  </div>
</template>

<script>
import ModalFooter from '../modal-footer/modal-footer'
import AreaSelect from '../area-select/area-select'
import Textarea from '../textarea/textarea'
import { companyAddReq, companyEditReq } from '../../api/company'

export default {
  name: 'SysCompanyModal',
  components: { Textarea, AreaSelect, ModalFooter },
  props: {
    parentId: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addFlag: false,
      title: '',
      modalVisiable: false,
      submitLoading: false,
      modalRule: {
        fullName: [
          { required: true, message: '机构全称必填', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '机构简称必填', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态必填', trigger: 'change' }
        ],
        companyOrder: [
          { required: true, message: '状态必填', trigger: 'change' }
        ],
        area: [
          { required: true, message: '所属区域必填', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '详细地址必填', trigger: 'blur' }
        ]
      },
      modalForm: {
        name: '',
        fullName: '',
        status: '',
        companyOrder: 0,
        area: [],
        address: ''
      },
      statusOptions: [
        {
          label: '营业'
        },
        {
          label: '筹备'
        }
      ]
    }
  },
  methods: {
    openModal(title, addFlag, data) {
      console.info('data', data)
      this.title = title
      this.addFlag = addFlag
      if (data) {
        console.info('data', data)
        Object.assign(this.modalForm, data)
        console.info('this.modalForm0', this.modalForm)
      } else {
        this.$refs['modalForm'].resetFields()
      }

      console.info('this.modalForm1', this.modalForm)
      this.modalVisiable = true
    },
    modalSubmitHandle() {
      this.$refs['modalForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          const requestData = Object.assign({}, this.modalForm)
          requestData.parentId = this.parentId
          if (this.addFlag) {
            companyAddReq(requestData).then(res => {
              this.submitSuccessHandle(res)
            }).finally(() => {
              this.submitLoading = false
            })
          } else {
            companyEditReq(requestData).then(res => {
              this.submitSuccessHandle(res)
            }).finally(() => {
              this.submitLoading = false
            })
          }
        }
      })
    },
    submitSuccessHandle(res) {
      this.modalVisiable = false
      this.utils.success(res.resultMessage)
      this.$emit('update-memu')
    },
    useFlagChangeHandle(flag) {
      this.modalForm.useFlag = flag ? '可用' : '禁用'
    },
    hiddenChangeHandle(flag) {
      this.modalForm.hidden = flag ? '显示' : '隐藏'
    },
    areaChangeHandle(value) {
      this.modalForm.area = value
    },
    addressChangeHandle(value) {
      this.modalForm.address = value
    }
  }
}
</script>

<style scoped>

</style>

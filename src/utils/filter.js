import Vue from 'vue'
import dict from './dict'

/**
* @Description: 使用方法{{value | useDictORDER_STATUS}}
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/19 11:43
*/
for(let key in dict){
    Vue.filter(`useDict${key}`, value => {
      const target = dict[key].filter(item => {
        return item.value == value;
      })
      return target.length ? target[0].text : value;
    })
}
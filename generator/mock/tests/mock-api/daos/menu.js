module.exports = {
  all: [
    {
      hasChildren: false,
      items: null,
      menuId: 101,
      menuName: '概览',
      menuLevel: 0,
      menuIndex: 1,
      menuIcon: 'dashboard',
      parMenuId: -1,
      urlAddr: 'dashboard'
    },
    {
      hasChildren: true,
      menuId: 102,
      menuName: '表单',
      menuLevel: 0,
      menuIndex: 2,
      menuIcon: 'form',
      parMenuId: -1,
      urlAddr: '',
      items: [
        {
          hasChildren: false,
          items: null,
          menuId: 111,
          menuName: '基础',
          menuLevel: 2,
          menuIndex: 1,
          menuIcon: '',
          parMenuId: 102,
          urlAddr: 'form-basic'
        },
        {
          hasChildren: false,
          items: null,
          menuId: 113,
          menuName: '高级',
          menuLevel: 2,
          menuIndex: 3,
          menuIcon: '',
          parMenuId: 102,
          urlAddr: 'form-advance'
        }
      ]
    },
    {
      menuId: 103,
      menuName: '列表',
      menuLevel: 0,
      menuIndex: 3,
      menuIcon: 'th',
      parMenuId: -1,
      urlAddr: '',
      hasChildren: true,
      items: [{
        hasChildren: false,
        items: null,
        menuId: 124,
        menuName: '查询表格',
        menuLevel: 2,
        menuIndex: 4,
        menuIcon: '',
        parMenuId: 103,
        menuDesc: '查询表格',
        urlAddr: 'list-table-list'
      }]
    },
    {
      menuId: 104,
      menuName: '详情',
      menuLevel: 0,
      menuIndex: 4,
      menuIcon: 'list-detail-view',
      parMenuId: -1,
      urlAddr: '',
      hasChildren: true,
      items: [
        {
          hasChildren: false,

          items: null,
          menuId: 133,
          menuName: '基础',
          menuLevel: 2,
          menuIndex: 6,
          menuIcon: '',
          parMenuId: 104,
          urlAddr: 'volume-snapshot'
        }]
    },
    {
      hasChildren: true,
      menuId: 105,
      menuName: '异常',
      menuLevel: 0,
      menuIndex: 5,
      menuIcon: 'warning-sign',
      parMenuId: -1,
      urlAddr: '',
      items: [
        {
          hasChildren: false,
          items: null,
          menuId: 141,
          menuName: '403',
          menuLevel: 2,
          menuIndex: 1,
          menuIcon: '',
          parMenuId: 105,
          urlAddr: 'error-403'
        },
        {
          hasChildren: false,
          items: null,
          menuId: 142,
          menuName: '404',
          menuLevel: 2,
          menuIndex: 1,
          menuIcon: '',
          parMenuId: 105,
          urlAddr: 'error-404'
        },
        {
          hasChildren: false,
          items: null,
          menuId: 143,
          menuName: '500',
          menuLevel: 2,
          menuIndex: 1,
          menuIcon: '',
          parMenuId: 105,
          urlAddr: 'error-500'
        },
      ]
    },
    {
      hasChildren: true,
      menuId: 106,
      menuName: '个人',
      menuLevel: 0,
      menuIndex: 5,
      menuIcon: 'user',
      parMenuId: -1,
      urlAddr: '',
      items: [
        {
          hasChildren: false,
          items: null,
          menuId: 152,
          menuName: '修改密码',
          menuLevel: 2,
          menuIndex: 1,
          menuIcon: '',
          parMenuId: 106,
          urlAddr: 'user-modify-password'
        }
      ]
    }],
  findAll () {
    return this.all;
  }
};

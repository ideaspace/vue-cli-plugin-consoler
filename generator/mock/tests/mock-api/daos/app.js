module.exports = {
  all: [{
    createTime: 1551929721000,
    dataCenterName: "数据中心",
    deleted: false,
    id: 10007,
    monitorItemNum: 2,
    name: "MonitorServant",
    code: "cd-monitor-servant",
    tenant: "test",
    updateTime: 1551955939000,
  }],
  item: [{
    applicationName: "MonitorController",
    monitorMode: "METRIC",
    exporterName: "spring_micrometer_exporter",
    target: "http://192.168.90.98/metrics:8478",
    monitorItemStatus: 1
  }],
  findAll () {
    return this.all;
  },
  find() {
    return this.item
  }
};

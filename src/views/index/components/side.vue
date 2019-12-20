<template>
  <div class="side-container">
    <div class="forecast-info">
      <div class="title">
        <label>雨情信息</label>
        /
        <span> 预报降雨</span>
        <span class="unit">（单位：mm）</span>
        <el-button size="mini"
                   type="primary"
                   class="pull-right">查看预案</el-button>
      </div>
      <div class="forecast-content">
        <div>
          <img src="@/assets/images/pc/yj.png"
               alt="">
        </div>
        <div>
          <label class="first">36</label>
          <div>1小时预报雨量</div>
        </div>
        <div>
          <label class="last">36</label>
          <div>1小时预报雨量</div>
        </div>
      </div>
    </div>
    <div class="rain-info">
      <div class="title">
        <label>雨情信息</label>
        /
        <span>实测雨量</span>
        <span class="unit">（单位：mm）</span>
      </div>
      <div class="rain-content">
        <div>
          <label>0</label>
          <div>前1小时平均量</div>
        </div>
        <div>
          <label>0</label>
          <div>前3小时平均量</div>
        </div>
        <div>
          <label>0</label>
          <div>前6小时平均量</div>
        </div>
      </div>
    </div>
    <div class="water-situation">
      <div class="title">
        <label>水情信息</label>
        <span class="unit">（单位：mm）</span>
      </div>
      <div class="situation-content">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column prop="date"
                           label="水位站"
                           width="100"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="name"
                           label="警戒水位m"
                           width="80"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="address"
                           label="实时水位m"
                           width="80"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="time"
                           label="最新时间"
                           show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="js-info">
      <div class="title">
        <label>积水分布信息</label>
      </div>
      <p>海淀区不同水深范围内的积水面积和道路积水长度统计</p>
      <div class="js-content">
        <el-table :data="jsData"
                  border
                  style="width: 100%">
          <el-table-column prop="fw"
                           label="水深范围"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="积水区域"
                           width="80"
                           show-overflow-tooltip>
            <el-table-column prop="mj"
                             label="面积(km³)">
            </el-table-column>
            <el-table-column prop="mzb"
                             width="70"
                             label="占比(%)">
            </el-table-column>
          </el-table-column>
          <el-table-column label="积水道路"
                           show-overflow-tooltip>
            <el-table-column prop="cd"
                             label="长度(km)">
            </el-table-column>
            <el-table-column prop="czb"
                             width="70"
                             label="占比(%)">
            </el-table-column>
          </el-table-column>

        </el-table>
      </div>
    </div>

    <div class="ss-info">
      <div class="title">
        <label style="margin-right: 20px;">实时监控图层控制</label>
        <el-switch v-model="value"
                   :width="60"
                   active-color="#0af4eb"
                   inactive-color="#ccc">
        </el-switch>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'side',
  data() {
    return {
      value: true,
      tableData: [
        {
          date: '北旱河',
          name: '16',
          address: '12',
          time: '2019/07/01 08:00'
        },
        {
          date: '北旱河',
          name: '16',
          address: '12',
          time: '2019/07/01 08:00'
        },
        {
          date: '北旱河',
          name: '16',
          address: '12',
          time: '2019/07/01 08:00'
        },
        {
          date: '北旱河',
          name: '16',
          address: '12',
          time: '2019/07/01 08:00'
        },
        {
          date: '北旱河',
          name: '16',
          address: '12',
          time: '2019/07/01 08:00'
        },
        {
          date: '北旱河',
          name: '16',
          address: '12',
          time: '2019/07/01 08:00'
        }
      ],
      jsData: [
        {
          fw: '0.15~0.3m',
          mj: 0.53,
          mzb: 0.03,
          cd: 58.91,
          czb: 5.46
        },
        {
          fw: '0.15~0.3m',
          mj: 0.53,
          mzb: 0.03,
          cd: 58.91,
          czb: 5.46
        },
        {
          fw: '0.15~0.3m',
          mj: 0.53,
          mzb: 0.03,
          cd: 58.91,
          czb: 5.46
        },
        {
          fw: '0.15~0.3m',
          mj: 0.53,
          mzb: 0.03,
          cd: 58.91,
          czb: 5.46
        },
        {
          fw: '合计',
          mj: 0.53,
          mzb: 0.03,
          cd: 58.91,
          czb: 5.46
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.side-container {
  position: relative;
  height: 100%;
  width: 100%;
  $borderLine: #29588c;
  .title {
    height: 30px;
    line-height: 30px;
    padding-left: 12px;
    font-size: 15px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 20px;
      width: 3px;
      left: 0;
      top: 4px;
      background-color: #0af4eb;
    }
    .unit {
      font-size: 12px;
    }
  }
  .forecast-info,
  .rain-info,
  .water-situation,
  .js-info,
  .ss-info {
    background: url(~@/assets/images/pc/1.png);
    padding: 5px 10px;
    border: 1px solid #29588c;
    margin-bottom: 4px;
  }
  .ss-info {
    margin-bottom: 0;
  }
  .forecast-info {
    .forecast-content {
      display: flex;
      > div {
        width: calc(100% / 3);
        padding: 0 10px;
        font-size: 12px;
        img {
          width: 90%;
        }
        label {
          font-size: 50px;
          &.first {
            color: #0af4eb;
          }
          &.last {
            color: #27bcff;
          }
        }
      }
    }
  }

  .rain-info {
    margin-bottom: 3px;
    .rain-content {
      display: flex;
      font-size: 12px;
      > div {
        width: calc(100% / 3);
        padding: 6px 10px;
        label {
          color: #fbe701;
          font-size: 18px;
        }
      }
    }
  }
  .water-situation {
    .situation-content {
    }
  }
  .js-info {
    p {
      color: #0af4eb;
      font-size: 12px;
    }
  }

  /deep/ {
    .el-table {
      background-color: transparent;
      text-align: center;
      color: #fff;
    }
    th {
      background-color: transparent;
      padding: 5px 0;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
    td {
      padding: 5px 0;
      text-align: center;
    }
    tr {
      background-color: transparent;
      padding: 5px 0;
      text-align: center;
    }
    .el-table tbody tr:hover > td {
      background-color: #0af4eb !important;
    }
    .el-table--border:after,
    .el-table--group:after,
    .el-table:before {
      background-color: $borderLine;
    }

    .el-table--border,
    .el-table--group {
      border-color: $borderLine;
    }

    .el-table td,
    .el-table th.is-leaf {
      border-bottom: 1px solid $borderLine;
    }

    .el-table--border th,
    .el-table--border th.gutter:last-of-type {
      border-bottom: 1px solid $borderLine;
    }
    .el-table thead.is-group th {
      background-color: #2a3c6c;
    }

    .el-table--border td,
    .el-table--border th {
      border-right: 1px solid $borderLine;
    }
  }
}
</style>

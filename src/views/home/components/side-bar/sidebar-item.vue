<template>
  <div class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item)">
      <el-menu-item :index="onlyOneChild.url"
                    @click="toPath(item)">
        <i :class="onlyOneChild.icon"></i>
        <span slot="title">{{ onlyOneChild.resourceName }}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else
                :index="item.url"
                @click="toPath(item)">
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.resourceName }}</span>
      </template>
      <sidebar-item v-for="child in item.children"
                    :key="child.id"
                    :item="child" />
    </el-submenu>
  </div>
</template>

<script>
import { getUserInfo } from '@/services/auth.service';
export default {
  name: 'sidebar-item',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  created() {},
  methods: {
    hasOneShowingChild(children = [], parent) {
      if (children) {
        // 后端返回的children有的是null
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false;
          } else {
            this.onlyOneChild = item;
            return true;
          }
        });
        if (showingChildren.length === 1) {
          return true;
        }
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
          return true;
        }
        return false;
      } else {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }
    },
    toPath(item) {
      if (item.urlType === 'out') {
        const userInfo = JSON.parse(getUserInfo());
        window.open(
          `${item.url}?userInfo=${encodeURIComponent(
            JSON.stringify(userInfo)
          )}`,
          '_blank'
        );
        setTimeout(() => {
          this.$router.push({ path: this.$store.state.currUserMenus[0].url });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  // height: 100%;
}
</style>


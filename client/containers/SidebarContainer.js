import {toggleAdminMod, toggleSidebar} from "../actions/sidebar";
import Sidebar from '../components/menu/Sidebar.js';
import {connect} from "react-redux";
import {removeCategory} from "../actions/categories";

const mapStateToProps = (state) => {
  return {
    adminMode: state.sidebar.adminMode,
    categories: state.global.categories,
    collapsed: !state.sidebar.visibilitySidebar,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCategory: (id) => {
      dispatch(removeCategory(id))
    },
    setAdminMode: () => {
      dispatch(toggleAdminMod());
    },
    setCollapsed: () => {
      dispatch(toggleSidebar());
    }
  }
};

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);
export default SidebarContainer;
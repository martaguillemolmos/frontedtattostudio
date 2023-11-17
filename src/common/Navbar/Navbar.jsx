// import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { userData } from '../../pages/userSlice';

// export const SideMenu = () => {
//     const rdxCredentials = useSelector(userData);

// return (<Sidebar>
//     <Menu
//       menuItemStyles={{
//         button: {
//           // the active class will be added automatically by react router
//           // so we can use it to style the active menu item
//           [`&.active`]: {
//             backgroundColor: '#13395e',
//             color: '#b6c8d9',
//           },
//         },
//       }}
//     >
//         {/* Estás son las vistas públicas. */}
//       <MenuItem component={<Link to="/" />}> Inicio</MenuItem>
//       <MenuItem component={<Link to="/product" />}> Productos</MenuItem>

//       {!rdxCredentials?.credentials.token ? (
//         <> 
//       <MenuItem component={<Link to="/register" />}> Registarte</MenuItem>
//       <MenuItem component={<Link to="/login" />}> Iniciar sesión</MenuItem>
//         </>
//          ) : (
//         <>
//         <MenuItem component={<Link to="/profile" />}> rdxCredentials.credentials.name</MenuItem>
//         {/* <div onClick={logOutMe}>
//             <LinkButton path={"/"} title={"Cerrar sesión"} />   */}
//           {/* </div> */}
//         </>
//         )}
//     </Menu>
//   </Sidebar>)
// }

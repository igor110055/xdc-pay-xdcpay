// const React = require("react");
// const connect = require("react-redux").connect;
// const actions = require("../../../../ui/app/actions");
// import Identicon from "../../../../ui/app/components/identicon";
// import PropTypes from "prop-types";
// import { name } from "loglevel";

// class ContactDetails extends React.Component {
//   constructor(props) {
//     super(props)
//     const viewContactObj = this.props.viewContactObj
//     this.state = {
//       address: viewContactObj.address,
//       name: viewContactObj.address,
//     }
//   }

//   render() {
//     const state = this.props;
//     // const contactList = state.metamask.addressBook;
//     const viewContactObj = this.props
  
    

//     return (
//       <div
//         className="flex-column flex-grow"
//         style={{ maxHeight: "585px", overflowY: "auto" }}
//       >
//         <div
//           className="section-title flex-row"
//           style={{
//             // borderBottom: "1px solid #E3E7EB",
//             paddingBottom: "17px",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <img
//             src="/images/Assets/BackArrow.svg"
//             style={{ marginLeft: "17px", cursor: "pointer" }}
//             onClick={() => {
//                 state.dispatch(actions.Contacts())
//             }}
//           />
//           <h2 style={{ fontFamily: "Inter-bold" }}>Contact Details</h2>
//           {/* <img
//             src="/images/Assets/Add.svg"
//             style={{ cursor: "pointer", marginRight: "11px" }}
//             onClick={() => {
//               state.dispatch(actions.showAddContactsPage());
//             }}
//                 /> */}
//                 <div>Edit</div>
//         </div>
//         <div className="list">
         
          
            
//               <div style={{ padding: "9px 0 0 20px",  borderBottom: "1px solid #E3E7EB",}}>
//                 <Identicon
//                   overflow="none"
//                   address={viewContactObj.address}
//                   diameter={69}
//                   style={{ display:'flex',alignItems:'center',justifyContent:'center', overflow: "inherit" }}
//                 />
//                   {viewContactObj.name}
//                   <div>
//                       {'Wallet Address'}
//                     <div> {viewContactObj.address}</div>
//                 </div>
                  
//               </div>
           
//           )
//         </div>
//       </div>
//     );
//   }
// }

// module.exports = connect(mapStateToProps)(ContactDetails);

// function mapStateToProps(state) {
//   return {
//     metamask: state.metamask,
//     warning: state.appState.warning,
//     viewContactObj: state.appState.currentviewContactObj,
//   };
// }

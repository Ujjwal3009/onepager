const React      = require('react');
const swal       = require('sweetalert');
const Input      = require('react-bootstrap/lib/Input');
const cx         = require('classnames');
const PureMixin  = require('../../../shared/mixins/PureMixin.js');
const AppActions = require('../../AppActions.js');
const scrollIntoView  = require('../../../shared/lib/scrollview.js');
const SectionTitle = require("./SectionTitle.jsx");

function confirmDelete(proceed) {
  swal({
    title             : "Are you sure?",
    text              : "Time travel is still hard and there is no way back",
    type              : "warning",
    showCancelButton  : true,
    confirmButtonText : "Yes, delete it",
    closeOnConfirm    : true,
    confirmButtonColor: '#d32f2f'
  }, proceed);
}

let Section = React.createClass({
  mixins: [PureMixin],

  propTypes: {
    active: React.PropTypes.bool,
    id: React.PropTypes.number,
    index: React.PropTypes.number,
    title: React.PropTypes.string
  },

  getInitialState(){
    return {
      titleEditState: false
    };
  },

  handleRemoveSection(){
    confirmDelete(()=> {
      AppActions.removeSection(this.props.index);
      swal("Deleted!", "Section has been deleted.");
    });
  },

  handleDuplicateSection(){
    //TODO: SHOULD ONLY DUPLICATE THE SECTION
    AppActions.duplicateSection(this.props.index);
  },

  handleEditSection(){
    AppActions.editSection(this.props.index);
  },

  handleScrollIntoView(){
    scrollIntoView(document.getElementById(this.props.id));
  },

  render() {
    let {title, index} = this.props;

    let classes = cx('section', {
      'active'    : this.props.active
    });

    return (
      <div className={classes}>
        <SectionTitle title={title} index={index} >
          <h3 onClick={this.handleScrollIntoView}>
            <span className="fa fa-ellipsis-v"></span><span className="fa fa-ellipsis-v"></span> {title}
          </h3>
        </SectionTitle>
        <div className="action-btns">
          <span className="fa fa-edit" onClick={this.handleEditSection} data-toggle="tooltip" title="Edit"></span>
          <span className="fa fa-copy" onClick={this.handleDuplicateSection} data-toggle="tooltip" title="Copy"></span>
          <span className="fa fa-trash-o" onClick={this.handleRemoveSection} data-toggle="tooltip" title="Delete"></span>
        </div>
      </div>
    );
  }
});

module.exports = Section;

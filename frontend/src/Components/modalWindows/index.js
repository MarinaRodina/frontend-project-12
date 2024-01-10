import AddChannelModal from './AddNewChannel.jsx';

const modals = {
  add: AddChannelModal,
};

export default (channelName) => modals[channelName];

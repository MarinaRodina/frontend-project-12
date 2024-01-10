import AddChannelModal from './AddNewChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  add: AddChannelModal,
  delete: RemoveChannel,
};

export default (channelName) => modals[channelName];

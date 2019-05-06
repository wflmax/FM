import * as types from './mutation-types';
export default {
  async flightCodeHistory({
    commit,
    state
  }) {
    commit(types.FLIGHT_CODE_HISTORY);
  },

  async flightRouteHistory({
    commit,
    state
  }) {
    commit(types.FLIGHT_ROUTE_HISTORY);
  },
  async ticketList({
    commit,
  }) {
    commit(types.TICKET_LIST);
  }
}

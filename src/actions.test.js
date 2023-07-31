import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import * as api from './request/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the API function
jest.mock('./request/api', () => ({
  getData: jest.fn(),
}));

describe('async actions', () => {
    it('should fetch data and dispatch FETCH_DATA_SUCCESS', async () => {
      const rawData = [{
        "currentBalance": "13340.3884795713",
        "grade": "2",
        "homeOwnership": "MORTGAGE",
        "quarter": "4",
        "term": " 36 months",
        "year": "2015"
      },
      {
        "currentBalance": "10254.3896155371",
        "grade": "4",
        "homeOwnership": "RENT",
        "quarter": "3",
        "term": " 36 months",
        "year": "2014"
      }];
      const parsedData = [{
        year: "2015",
        quarter: "4",
        grade: "2",
        homeOwnership: "MORTGAGE",
        term: " 36 months",
        currentBalance: "13340.3884795713"
      },
      {
        year: "2014",
        quarter: "3",
        grade: "4",
        homeOwnership: "RENT",
        term: " 36 months",
        currentBalance: "10254.3896155371"
      }];
      const expectedActions = [
        { type: actions.FETCH_DATA_REQUEST },
        { type: actions.FETCH_DATA_SUCCESS, payload: parsedData },
      ];
  
      // Mock the API function to return the mocked CSV data
      api.getData.mockResolvedValue(rawData);
      const store = mockStore({ data: [], loading: false, error: null });
  
      await store.dispatch(actions.fetchData());
  
      expect(store.getActions()).toEqual(expectedActions);
    });


    it('should fetch data and dispatch FETCH_DATA_FAILURE on error', async () => {
    const error = new Error('API call failed');
    const expectedActions = [
        { type: actions.FETCH_DATA_REQUEST },
        { type: actions.FETCH_DATA_FAILURE, payload: error },
    ];

    // Mock the API function to throw an error
    api.getData.mockRejectedValue(error);
    const store = mockStore({ data: [], loading: false, error: null });

    await store.dispatch(actions.fetchData());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
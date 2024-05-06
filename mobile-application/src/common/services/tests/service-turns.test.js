import { Audio } from 'expo-av';
import { getDeviceAuthHeaders } from "../../device-connection";
import { delay, getResponseBlobUrl } from "../../helpers";
import { getServiceTurnsAPIInstance } from "../api-configuration";
import { loadTurnsStatusTable, loadMultipleAudio } from "../service-turn";

jest.mock('expo-av');
jest.mock('../api-configuration');
jest.mock('../../device-connection');
jest.mock('../../helpers');

describe('Service Turns service', () => {
  const mockApiInstance = {
    getTurnsStatusTable: jest.fn(),
    getTurnAudio: jest.fn(),
  };
  const mockAuthHeaders = {
    applicationId: 'mock-application-id',
    authorization: 'mock-authorization',
  };

  beforeEach(() => {
    getServiceTurnsAPIInstance.mockReturnValue(mockApiInstance);
    getDeviceAuthHeaders.mockResolvedValue(mockAuthHeaders);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadTurnsStatusTable', () => {
    const mockItemsResponse = [
      {
        ticketNumber: 'DS-SA-3',
        queueName: 'Saving Account',
        statusName: 'Pending',
        statusCode: 'PENDING',
      }
    ];
  
    beforeEach(() => {
      mockApiInstance.getTurnsStatusTable.mockResolvedValue(mockItemsResponse);
    });
  
    it('loads the status table through the service turn api as expected', async () => {
      const response = await loadTurnsStatusTable();
      expect(response).toEqual({
        items: [
          {
            ticketNumber: 'DS-SA-3',
            queueName: 'Saving Account',
            statusName: 'Pending',
            statusCode: 'PENDING',
          },
        ],
      });
      expect(mockApiInstance.getTurnsStatusTable).toHaveBeenCalledTimes(1);
      expect(mockApiInstance.getTurnsStatusTable).toHaveBeenCalledWith(
        mockAuthHeaders.applicationId,
        mockAuthHeaders.authorization,
      );
      expect(getServiceTurnsAPIInstance).toHaveBeenCalledTimes(1);
      expect(getServiceTurnsAPIInstance).toHaveBeenCalledWith();
      expect(getDeviceAuthHeaders).toHaveBeenCalledTimes(1);
      expect(getDeviceAuthHeaders).toHaveBeenCalledWith();
    });
  });


  describe('loadMultipleAudio', () => {
    const mockBlob = { size: 1024, type: "mpeg/audio" };
    const mockTextItems = ['first', 'second'];
    const mockURI = 'mockURI';
    const mockSound = {
      loadAsync: jest.fn(),
    };
    const mockAudioResponse = {
      blob: () => mockBlob,
    };
  
    beforeEach(() => {
      Audio.Sound.mockReturnValue(mockSound);
      getResponseBlobUrl.mockResolvedValue(mockURI);
      mockApiInstance.getTurnAudio.mockResolvedValue(mockAudioResponse);
    });
  
    it('loads the audio items as expected expected', async () => {
      await loadMultipleAudio(mockTextItems);
      expect(mockApiInstance.getTurnAudio).toHaveBeenCalledTimes(2);
      expect(mockApiInstance.getTurnAudio).toHaveBeenCalledWith(
        'first',
        mockAuthHeaders.applicationId,
        mockAuthHeaders.authorization,
      );
      expect(mockApiInstance.getTurnAudio).toHaveBeenCalledWith(
        'second',
        mockAuthHeaders.applicationId,
        mockAuthHeaders.authorization,
      );
      expect(mockSound.loadAsync).toHaveBeenCalledTimes(2);
      expect(mockSound.loadAsync).toHaveBeenCalledWith(
        { uri: mockURI },
        { shouldPlay: true },
      );
      expect(getResponseBlobUrl).toHaveBeenCalledTimes(2);
      expect(getResponseBlobUrl).toHaveBeenCalledWith(mockAudioResponse);
      expect(getServiceTurnsAPIInstance).toHaveBeenCalledTimes(2);
      expect(getServiceTurnsAPIInstance).toHaveBeenCalledWith();
      expect(getDeviceAuthHeaders).toHaveBeenCalledTimes(2);
      expect(getDeviceAuthHeaders).toHaveBeenCalledWith();
    });
  });
});
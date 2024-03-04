import got from "got";

const BASE_API = "https://www.binance.com/bapi/futures/";

export default class Leaderboard {

  constructor() {
    this.tradeType = "PERPETUAL";
    this.encryptedUid = null;
  }
  init = (config) => {
    this.tradeType = config.tradeType;
  };
// TODO NOK
// https://www.binance.com/bapi/futures/v1/public/future/leaderboard/getFeaturedUserRank

  /**
   * @deprecated not yet implemented
   * @returns {Promise<*>}
   */
  getPrice = async () => {
    const url = BASE_API + "v1/public/future/leaderboard/getOtherPosition";
    const payload = {
      json: {
        encryptedUid: this.encryptedUid,
        tradeType: this.tradeType,
      },
    };
    const { data } = await got.post(url, payload).json();
    return data;
  };

  /**
   * Get user position
   * @param encryptedUid
   * @param tradeType
   * @returns {Promise<*|{success: boolean, otherPositionRetList: *[]}>}
   */
  getPosition = async (encryptedUid, tradeType = this.tradeType) => {
    try {
      const url = BASE_API + "v1/public/future/leaderboard/getOtherPosition";
      const payload = {
        json: {
          encryptedUid: encryptedUid,
          tradeType: tradeType,
        },
      };
      const { data } = await got.post(url, payload).json();
      return data;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        otherPositionRetList: [],
      };
    }
  };

  /**
   * Get user performance
   * @param encryptedUid
   * @returns {Promise<*|*[]>}
   */
  getPerformance = async (encryptedUid) => {
    try {
      const url = BASE_API + "v2/public/future/leaderboard/getOtherPerformance";
      let payload = {
        json: {
          encryptedUid: encryptedUid,
          tradeType: this.tradeType,
        },
      };
      const { data } = await got.post(url, payload).json();
      return data;
    } catch (error) {
      console.log(`error: `, error);
      return [];
    }
  };

  /**
   * Get leaderboard users
   * @param periodType
   * @param statisticsType
   * @returns {Promise<*|*[]>}
   */
  getLeaderboard = async (periodType = "MONTHLY", statisticsType = "ROI") => {
    try {
      const url = BASE_API + "v3/public/future/leaderboard/getLeaderboardRank";
      const payload = {
        json: {
          isShared: true,
          periodType: periodType,
          statisticsType: statisticsType,
          tradeType: this.tradeType,
          limit: 100,
        },
      };
      const { data } = await got.post(url, payload).json();
      return data;
    } catch (error) {
      console.log(`error: `, error);
      return [];
    }
  };

  /**
   * Get user informations
   * @param encryptedUid
   * @returns {Promise<*|*[]>}
   */
  getUserInformations = async (encryptedUid) => {
    try {
      const url =
          BASE_API + "v2/public/future/leaderboard/getOtherLeaderboardBaseInfo";
      let payload = {
        json: {
          encryptedUid: encryptedUid,
          tradeType: this.tradeType,
        },
      };
      const { data } = await got.post(url, payload).json();

      return data;
    } catch (error) {
      console.log(`error: `, error);
      return [];
    }
  };

  /**
   * @deprecated not yet implemented
   * @param periodType
   * @param pnlGainType
   * @param sortType
   * @returns {Promise<*|*[]>}
   */
  findLeaderboardUsers = async (periodType = "EXACT_YEARLY", pnlGainType = "LEVEL5", sortType = "ROI") => {
    try {
      const url = BASE_API + "public/future/leaderboard/searchLeaderboard";
      let payload = {
        json: {
          isShared: true,
          tradeType: this.tradeType,
          periodType: periodType,
          pnlGainType: pnlGainType,
          type: "filterResults",
          sortType: sortType,
          limit: "200",
        },
      };
      const { data } = await got.post(url, payload).json();

      return data;
    } catch (error) {
      console.log(`error: `, error);
      return [];
    }
  };
  /**
   * @deprecated not yet implemented
   * @param encryptedUid
   * @returns {Promise<unknown>}
   */
  getRecentPosition = async (encryptedUid) => {
    try {
      let url =
          "https://backend.copyfuture.me/binance/leaderboard/get-user-positions?encUserId=";
      url += encryptedUid;
      const data = await got(url).json();

      return data;
    } catch (error) {
      console.log(`error: `, error);
      return [];
    }
  };
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresDB_1 = __importDefault(require("../config/postgresDB"));
const getSwapCardsByUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      SELECT * FROM swapcards
      WHERE uid_h1 = $1 OR uid_h2 = $1 OR uid_h3 = $1
    `;
        const swapCards = yield postgresDB_1.default.any(query, [uid]);
        console.log("fetching swap cards");
        return swapCards;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
// change value of swap card for true/false
const updateSwapCard = (swapCardID, boolValue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      UPDATE swapcards
      SET is_swapped = $1
      WHERE id = $2
      RETURNING *
    `;
        const swapCard = yield postgresDB_1.default.one(query, [boolValue, swapCardID]);
        console.log("updating swap card");
        return swapCard;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
// Function to update swap cards based on backpack item changes/creation
const updateCardsByBackPack = (itemid, uid) => __awaiter(void 0, void 0, void 0, function* () {
    // User added or changed a backpack item. here we update all swapcards that have that item
    // so we simply add swapcards in this way:
    // 1. find all wishlist items that match the backpack item (price in range, category, etc)
    // 2. check if the users with those wishlist items have a backpack item that matches the given uid wishlist items
    // 3. if they do, add a swapcard between the two users, with the backpack item as the item to swap
    // 4. if they don't, do nothing
    console.log("updating swap cards by backpack");
    try {
        const query = `
      WITH wishlist_matches AS (
        SELECT w.uid, w.itemid, b.uid AS bp_owner
        FROM wishlistitems w
        JOIN backpackitems b ON w.categoryid = b.categoryid
        WHERE b.itemid = $1 AND b.uid != w.uid
        AND (w.minprice <= b.price AND w.maxprice >= b.price)
      ),
      valid_swaps AS (
        SELECT wm.uid, wm.itemid, wm.bp_owner, bp.itemid AS bp_itemid
        FROM wishlist_matches wm
        JOIN backpackitems bp ON wm.uid = bp.uid
        JOIN wishlistitems w2 ON bp.categoryid = w2.categoryid
        WHERE w2.uid = $2
        AND (bp.price >= w2.minprice AND bp.price <= w2.maxprice)
      )
      INSERT INTO swapcards (uid_h1, uid_h2, bp_item1, bp_item2)
      SELECT $2, vs.uid, $1, vs.bp_itemid
      FROM valid_swaps vs
      WHERE NOT EXISTS (
        SELECT 1 FROM swapcards
        WHERE (uid_h1 = $2 AND uid_h2 = vs.uid AND bp_item1 = $1 AND bp_item2 = vs.bp_itemid)
        OR (uid_h1 = vs.uid AND uid_h2 = $2 AND bp_item1 = vs.bp_itemid AND bp_item2 = $1)
      );
    `;
        yield postgresDB_1.default.none(query, [itemid, uid]);
        console.log("Updating swap cards based on backpack item changes");
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
// Function to update swap cards based on wishlist item changes/creation
const updateCardsByWishList = (itemid, uid) => __awaiter(void 0, void 0, void 0, function* () {
    // User added or changed a wishlist item. here we update all swapcards that have that item
    // so we simply add swapcards in this way:
    // 1. find all backpack items that match the wishlist item (price in range, category, etc)
    // 2. check if the users with those backpack items have a wishlist item that matches the given uid wishlist items
    // 3. if they do, add a swapcard between the two users, with the backpack item as the item to swap
    // 4. if they don't, do nothing
    try {
        const query = `
      WITH backpack_matches AS (
        SELECT b.uid, b.itemid, w.uid AS wl_owner
        FROM backpackitems b
        JOIN wishlistitems w ON w.categoryid = b.categoryid
        WHERE w.itemid = $1 AND w.uid != b.uid
        AND (w.minprice <= b.price AND w.maxprice >= b.price)
      ),
      valid_swaps AS (
        SELECT bm.uid, bm.itemid, bm.wl_owner, wl.itemid AS wl_itemid
        FROM backpack_matches bm
        JOIN wishlistitems wl ON bm.uid = wl.uid
        JOIN backpackitems b2 ON wl.categoryid = b2.categoryid
        WHERE b2.uid = $2
        AND (b2.price >= wl.minprice AND b2.price <= wl.maxprice)
      )
      INSERT INTO swapcards (uid_h1, uid_h2, bp_item1, bp_item2)
      SELECT $2, vs.uid, vs.itemid, $1
      FROM valid_swaps vs
      WHERE NOT EXISTS (
        SELECT 1 FROM swapcards
        WHERE (uid_h1 = $2 AND uid_h2 = vs.uid AND bp_item1 = vs.itemid AND bp_item2 = $1)
        OR (uid_h1 = vs.uid AND uid_h2 = $2 AND bp_item1 = $1 AND bp_item2 = vs.itemid)
      );
    `;
        yield postgresDB_1.default.none(query, [itemid, uid]);
        console.log("Updating swap cards based on wishlist item changes");
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
// function to delete swap cards based on backpack item deletion
const deleteCardsByBackPack = function (itemid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
      DELETE FROM swapcards
      WHERE bp_item1 = $1 OR bp_item2 = $1
      RETURNING *
    `;
            const swapCard = yield postgresDB_1.default.one(query, [itemid]);
            console.log("deleting swap card by backpack item");
            return swapCard;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
};
exports.default = {
    getSwapCardsByUser,
    updateSwapCard,
    updateCardsByBackPack,
    updateCardsByWishList,
    deleteCardsByBackPack,
};

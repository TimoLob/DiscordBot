module.exports = {
    isAdmin : (user) => {
    const adminRoleIDs = ["610472977770872844","457151265965735937"]
    for( let [key,value] of user.roles.cache) {
        if(adminRoleIDs.includes(key)) {
            return true;
        }
    }
    return false;
    },

    shuffle : (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
        }
    return a;
    }

}


module.exports = {
    isAdmin : (user) => {
    const adminRoleIDs = ["610472977770872844","457151265965735937"];
    const myID = "209794043482210304";
    const roleNames = ["Admin","admin"];
    if(user.id == myID)
        return true;
    for( let [key,value] of user.roles.cache) {
        if(roleNames.includes(value.name)) {
            return true;
        }
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
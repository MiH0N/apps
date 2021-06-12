function _solveHanoi(num, from, mid, to) {
    if (num === 0) {
        return [];
    }

    const ans = [];
    ans.push(..._solveHanoi(num - 1, from, to, mid));
    ans.push({ num, from, to });
    ans.push(..._solveHanoi(num - 1, mid, from, to));
    return ans;
}

function solveHanoi(num,from, mid , to) {
    return _solveHanoi(num, from, mid , to);
}

export default solveHanoi;
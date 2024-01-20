
const pending = action => `${action}__PENDING`;
const success = action => `${action}__SUCCESS`;
const fail = action => `${action}__FAIL`;
const rejected = action => `${action}__REJECTED`;

export {
    pending,
    success,
    fail,
    rejected,
}
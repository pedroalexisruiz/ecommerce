import { createDraft } from 'immer';

export const isPrimitive = (possiblePrimitive): boolean => {
    return possiblePrimitive !== Object(possiblePrimitive);
};

export const mapStateToProps = (stateAttrs: any) => {
    if (Array.isArray(stateAttrs)) {
        return stateAttrs.map(attr => mapStateToProps(attr));
    }
    return isPrimitive(stateAttrs) ? stateAttrs : createDraft(stateAttrs);
};

export interface CreateStatus {
  creating: boolean;
  created: boolean;
  error: string;
}

export function getDefaultCreateStatus(): CreateStatus {
  return {
    creating: false,
    created: false,
    error: null,
  }
}

export function getCreatingStatus(): CreateStatus {
  return {
    creating: true,
    created: false,
    error: null,
  }
}

export function getCreatedStatus(): CreateStatus {
  return {
    creating: false,
    created: true,
    error: null,
  }
}

export function getCreateErrorStatus(error: string): CreateStatus {
  return {
    creating: false,
    created: false,
    error: error || 'Issue creating',
  }
}

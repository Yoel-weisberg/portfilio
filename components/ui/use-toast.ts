"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  open: boolean
  variant?: "default" | "destructive"
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: Omit<ToastProps, "id" | "open">
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToastProps> & { id: string }
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId: string
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId: string
    }

interface State {
  toasts: ToastProps[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, { id: genId(), ...action.toast, open: true }].slice(-TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      // Cancel any pending removal to avoid duplicate animations
      if (toastTimeouts.has(toastId)) {
        clearTimeout(toastTimeouts.get(toastId))
        toastTimeouts.delete(toastId)
      }

      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === toastId ? { ...t, open: false } : t)),
      }
    }

    case actionTypes.REMOVE_TOAST:
      if (state.toasts.findIndex((t) => t.id === action.toastId) === -1) {
        return state
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }

    default:
      return state
  }
}

export interface ToastActionElement {
  altText: string
  action: React.ReactNode
}

export type ToastActionProps = {
  altText: string
  action: React.ReactNode
}

export interface Toast extends Omit<ToastProps, "id" | "open"> {}

export function useToast() {
  const [state, setState] = useState<State>({ toasts: [] })

  const dispatch = useCallback((action: Action) => {
    setState((prevState) => reducer(prevState, action))
  }, [])

  const toast = useCallback(
    ({ ...props }: Toast) => {
      const id = genId()

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: props,
      })

      return {
        id,
        dismiss: () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id }),
        update: (props: Toast) =>
          dispatch({
            type: actionTypes.UPDATE_TOAST,
            toast: { ...props, id },
          }),
      }
    },
    [dispatch],
  )

  const dismiss = useCallback(
    (toastId: string) => {
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId })
    },
    [dispatch],
  )

  useEffect(() => {
    state.toasts.forEach((t) => {
      if (!t.open && !toastTimeouts.has(t.id)) {
        const timeout = setTimeout(() => {
          dispatch({ type: actionTypes.REMOVE_TOAST, toastId: t.id })
        }, TOAST_REMOVE_DELAY)

        toastTimeouts.set(t.id, timeout)
      }
    })

    return () => {
      toastTimeouts.forEach((timeout) => clearTimeout(timeout))
      toastTimeouts.clear()
    }
  }, [state.toasts, dispatch])

  return {
    toasts: state.toasts,
    toast,
    dismiss,
  }
}


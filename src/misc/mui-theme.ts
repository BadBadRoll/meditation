import { createTheme } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    '2xl': true
  }
}

export const COLORS = {
  primary: {
    light: '#660099',
    main: '#660099',
    dark: '#00001d',
    hover: 'black'
  },
  secondary: {
    light: '#fff655',
    main: '#fdc414',
    dark: '#c59400'
  }
}

export const theme = createTheme({
  breakpoints: { // same as tailwind default breakpoint
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  },
  typography: {
    fontFamily: '\'Open Sans\', sans-serif'
  },
  palette: {
    primary: COLORS.primary,
    secondary: COLORS.secondary
  },
  props: {
    MuiPaper: {
      variant: 'outlined'
    },
    MuiStepContent: {
      TransitionProps: {
        unmountOnExit: false,
        mountOnEnter: false
      }
    },
    MuiCheckbox: {
      disableRipple: true,
      disableFocusRipple: true,
      disableTouchRipple: true
    },
    MuiSelect: {
      variant: 'outlined',
      fullWidth: true,
      margin: 'dense'
    },
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true,
      margin: 'dense'
    },
    MuiListItem: {
      dense: true
    },
    MuiButtonBase: {
      disableRipple: true,
      color: 'primary'
    },
    MuiButton: {
      variant: 'contained',
      color: 'primary'
    },
    MuiTabs: {
      indicatorColor: 'primary'
    },
    MuiStepper: {
      variant: 'elevation',
      elevation: 0
    }

  },
  overrides: {
    MuiTab: {
      root: {
        minWidth: '0 !important'
      },
      wrapper: {
        flexDirection: 'row',
        '& :first-child': {
          marginBottom: '0 !important'
        }
      }
    },
    MuiTableCell: {
      root: {
        padding: '4px 10px !important'
      }
    },
    MuiButton: {
      label: {
        textTransform: 'none'
      },
      root: {
        borderRadius: '0.5rem'
      },
      containedPrimary: {
        '&.Mui-disabled': {
          color: 'white !important',
          backgroundColor: '#4a426e !important',
          opacity: '0.5'
        }
      },
      containedSecondary: {
        '&.Mui-disabled': {
          color: 'white !important',
          backgroundColor: '#fdc414 !important',
          opacity: '0.5'
        }
      },
      text: {
        '&:hover': {
          backgroundColor: 'transparent !important'
        }
      }
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent !important'
        }
      }
    },
    MuiFormControl: {
      marginDense: {
        margin: '0px !important'
      }
    },
    MuiInput: {
      root: {
        '&&:before': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.23) !important'
        },
        '&&:after': {
          borderBottom: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        '&:not(.read-only-input) fieldset': {
          border: '1px solid rgba(0, 0, 0, 0.28) !important'
        },
        '&.read-only-input fieldset': {
          border: '1px solid rgba(0, 0, 0, 0.08) !important'
        },
        // '&$focused fieldset': {
        //   borderWidth: '1px !important'
        // },
        borderRadius: '0.5rem'
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: '0.5rem'
      }
    },
    MuiPopover: {
      paper: {
        borderRadius: '0.25rem'
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 0,
        marginRight: '1rem'
      }
    },
    MuiListItem: {
      root: {
        cursor: 'pointer',
        '&:hover': {
          color: COLORS.primary.hover
        },
        '&:hover .MuiListItemIcon-root svg': {
          color: COLORS.primary.hover
        }
      },
      container: {
        cursor: 'pointer',
        '&:hover': {
          color: COLORS.primary.hover
        }
      }
    },
    MuiAccordion: {
      root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
          borderBottom: 0
        },
        '&:before': {
          display: 'none'
        },
        '&$expanded': {
          margin: 'auto'
        }
      },
      expanded: {}
    },
    MuiAccordionSummary: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: '3.5rem',
        '&$expanded': {
          minHeight: '3.5rem'
        }
      },
      content: {
        '&$expanded': {
          margin: '0.75rem 0'
        }
      },
      expanded: {}
    },
    MuiAccordionDetails: {
      root: {
        padding: '1rem'
      }
    },
    MuiFormHelperText: {
      root: {
        position: 'absolute',
        margin: 0,
        bottom: '-1.15rem',
        right: 0,
        height: '1.25rem',
        overflowY: 'hidden'
      }
    },
    MuiDialogTitle: {
      root: {
        textAlign: 'center',
        paddingTop: '2rem',
        paddingBottom: '0.5rem',
        '& .MuiTypography-root': {
          // fontSize: '1.5rem'
        }
      }
    },
    MuiList: {
      root: {
        '& .MuiListItemText-secondary': {
          fontSize: '0.625rem'
        },
        '& .MuiListItem-root.Mui-selected': {
          '& .MuiListItemText-primary': {
            color: '#3b82f6'
          },
          '& .MuiListItemText-secondary': {
            color: '#3b82f6'
          }
        }
      }
    },
    MuiStepLabel: {
      vertical: {
        height: '3rem',
        alignItems: 'flex-start',
        '& .MuiStepLabel-iconContainer': {
          height: '100%',
          alignItems: 'center'
        },
        '& .MuiStepLabel-labelContainer': {
          height: '50%',
          display: 'flex',
          justifyContent: 'flex-end',
          borderBottomWidth: '1px'
        },
        '& .MuiStepIcon-root': {
          height: '2rem',
          width: '2rem'
        },
        '& .MuiStepLabel-completed': {
          color: 'rgba(0, 0, 0, 0.54) !important'
        }
      }
    },
    MuiStepIcon: {
      completed: {
        color: '#06C666 !important'
      }
    },
    MuiRadio: {
      root: {
        '& .MuiSvgIcon-fontSizeSmall': {
          fontSize: '0.875rem'
        }
      }
    }
  }
})

export default theme

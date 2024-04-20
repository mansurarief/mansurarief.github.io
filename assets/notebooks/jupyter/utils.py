import numpy as np
import warnings
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D  

def sample_A(num_samples, num_vars, intervals):
    # Sample k matrices of A
    A_samples = np.zeros((num_samples, num_vars))  # Initialize a 3D array to hold k samples of C

    for i in range(num_samples):
        A_samples[i,:] = np.array(
            [np.random.uniform(*intervals['a1']), np.random.uniform(*intervals['a2'])],
        )
        
    return A_samples

def sample_C(num_samples, num_vars, num_constraints, intervals):
    # Sample k matrices of C
    C_samples = np.zeros((num_samples, num_constraints, num_vars))  # Initialize a 3D array to hold k samples of C

    for i in range(num_samples):
        C_samples[i] = np.array([
            [np.random.uniform(*intervals['c11']), np.random.uniform(*intervals['c12'])],
            [np.random.uniform(*intervals['c21']), np.random.uniform(*intervals['c22'])],
            [np.random.uniform(*intervals['c31']), np.random.uniform(*intervals['c32'])],
            [np.random.uniform(*intervals['c41']), np.random.uniform(*intervals['c42'])]
        ])
        
    return C_samples

def plot_constraints_and_feasible_set(C, D, legend=True):
    
    x1_range = np.linspace(-10, 25, 900)
    x2_range = np.linspace(-10, 25, 900)
    X1, X2 = np.meshgrid(x1_range, x2_range)

    fig  = plt.figure(figsize=(8, 6))
    feasible_region = None
    custom_lines = []  
    labels = []  
    colors = [f"C{i}" for i in range(len(D))]

    for j in range(1, len(D) + 1):
        # Construct each constraint based on C and D
        constraint = (C[(j, 1)]*X1 + C[(j, 2)]*X2) - D[j] <= 0
        label = f'${C[(j, 1)]}x_1 + {C[(j, 2)]}x_2 \leq {D[j]}$'
        labels.append(label)

        # Initialize feasible_region or combine with existing
        if feasible_region is None:
            feasible_region = constraint
        else:
            feasible_region &= constraint

        # Plot each constraint line
        with warnings.catch_warnings():
            warnings.filterwarnings("ignore", message="No contour levels were found within the data range.")
            plt.contour(X1, X2, constraint, levels=[0], linestyles='solid', linewidths=1, colors=colors[j-1])
        
        # Add a custom line object for each constraint
        custom_lines.append(Line2D([0], [0], color=colors[j-1], linewidth=1, linestyle='solid'))

    # Plot feasible region
    plt.imshow(feasible_region.astype(int), 
               extent=(x1_range.min(), x1_range.max(), x2_range.min(), x2_range.max()), 
               origin="lower", cmap="Greens", alpha=0.3)

    plt.title('Feasible Set for the Optimization Problem')
    plt.xlabel('$x_1$')
    plt.ylabel('$x_2$')
    plt.grid(True)
    plt.xlim([-10, 25])
    plt.ylim([-10, 25])

    # Create legend
    if legend:
        plt.legend(custom_lines, labels, loc='upper right', title="Constraints", fontsize=8)

    plt.tight_layout()
    plt.show()
    # fig.savefig('temp.png', transparent=True)
    
def plot_feasible_set_and_objective(C, D, A, b, f_star=None, x_star=None, legend=True):
    x1_range = np.linspace(-10, 25, 900)
    x2_range = np.linspace(-10, 25, 900)
    X1, X2 = np.meshgrid(x1_range, x2_range)

    fig = plt.figure(figsize=(8, 6))
    feasible_region = None
    custom_lines = []  
    labels = []  
    colors = [f"C{i}" for i in range(len(D))]

    # Plot constraints
    for j in range(1, len(D) + 1):
        constraint = (C[(j, 1)]*X1 + C[(j, 2)]*X2) - D[j] <= 0
        label = f'${C[(j, 1)]}x_1 + {C[(j, 2)]}x_2 \leq {D[j]}$'
        labels.append(label)

        if feasible_region is None:
            feasible_region = constraint
        else:
            feasible_region &= constraint

        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            plt.contour(X1, X2, constraint, levels=[0], linestyles='solid', linewidths=1, colors=colors[j-1])
        
        custom_lines.append(Line2D([0], [0], color=colors[j-1], linewidth=1, linestyle='solid'))

    # Plot feasible region
    plt.imshow(feasible_region.astype(int), 
               extent=(x1_range.min(), x1_range.max(), x2_range.min(), x2_range.max()), 
               origin="lower", cmap="Greens", alpha=0.3)

    # Plot objective function isovalue contours
    Z = A[1]*X1 + A[2]*X2 + b
    if f_star is not None:
        CS = plt.contour(X1, X2, Z, 50, alpha=0.5, levels=[f_star], colors='k')
        plt.clabel(CS, inline=True, fontsize=8, fmt='%1.1f', colors='k')

    # Mark the optimal solution x_star if provided
    if x_star is not None:
        plt.plot(x_star[0], x_star[1], 'k*', markersize=10, label='$x^*$')

    plt.title('Feasible Set and Objective Isovalues')
    plt.xlabel('$x_1$')
    plt.ylabel('$x_2$')
    plt.grid(True)
    plt.xlim([-10, 25])
    plt.ylim([-10, 25])

    # Extend the legend with the optimal solution marker
    if x_star is not None:
        custom_lines.append(Line2D([0], [0], color='k', marker='*', linestyle='None', markersize=10))
        labels.append('$x^*$')

    if legend:
        plt.legend(custom_lines, labels, loc='upper right', title="Constraints & Objective", fontsize=8)

    plt.tight_layout()
    plt.show()
    
    
def plot_feasible_set_and_objective_avg(C, D, A, b, f_star=None, x_star=None, num_samples=False, legend=True):
    x1_range = np.linspace(-10, 25, 2500)
    x2_range = np.linspace(-10, 25, 2500)
    X1, X2 = np.meshgrid(x1_range, x2_range)

    fig = plt.figure(figsize=(8, 6))
    feasible_region = None
    custom_lines = []  
    labels = []  
    colors = [f"C{i}" for i in range(len(D))]

    # Plot constraints
    for j in range(1, len(D) + 1):
        constraint = (C[(j, 1)]*X1 + C[(j, 2)]*X2) - D[j] <= 0
        label = f'${C[(j, 1)]}x_1 + {C[(j, 2)]}x_2 \leq {D[j]}$'
        labels.append(label)

        if feasible_region is None:
            feasible_region = constraint
        else:
            feasible_region &= constraint

        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            plt.contour(X1, X2, constraint, levels=[0], linestyles='solid', linewidths=1, colors=colors[j-1])
        
        custom_lines.append(Line2D([0], [0], color=colors[j-1], linewidth=1, linestyle='solid'))

    # Plot feasible region
    plt.imshow(feasible_region.astype(int), 
               extent=(x1_range.min(), x1_range.max(), x2_range.min(), x2_range.max()), 
               origin="lower", cmap="Greens", alpha=0.3)

    # Plot objective function isovalue contours
    for k in range(1, num_samples+1):
        Z = A[k, 1]*X1 + A[k, 2]*X2 + b
        
        if f_star is not None:
            CS = plt.contour(X1, X2, Z, 50, alpha=0.5, levels=[f_star], colors='k')
            plt.clabel(CS, inline=True, fontsize=8, fmt='%1.1f', colors='k')

    # Mark the optimal solution x_star if provided
    if x_star is not None:
        plt.plot(x_star[0], x_star[1], 'k*', markersize=10, label='$x^*$')

    plt.title('Feasible Set and Objective Isovalues')
    plt.xlabel('$x_1$')
    plt.ylabel('$x_2$')
    plt.grid(True)
    plt.xlim([-10, 25])
    plt.ylim([-10, 25])

    # Extend the legend with the optimal solution marker
    if x_star is not None:
        custom_lines.append(Line2D([0], [0], color='k', marker='*', linestyle='None', markersize=10))
        labels.append('$x^*$')

    if legend:
        plt.legend(custom_lines, labels, loc='upper right', title="Constraints & Objective", fontsize=8)

    plt.tight_layout()
    plt.show()
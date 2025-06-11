import React, { useState, useEffect } from 'react';
import { getSavingsGoals } from '../../../services/savingsService';

const SavingsGoals = () => {
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const savingsTips = [
    "Save loose change in a jar and deposit it when full.",
    "Use cashback apps and credit cards, but pay off the balance in full each month.",
    "Wait 24 hours before making non-essential purchases to avoid impulse buying.",
    "Set up automatic transfers to your savings account.",
    "Track your expenses to identify areas where you can cut back."
  ];

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    category: 'Other',
    priority: 'Medium',
    notes: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showTips, setShowTips] = useState(true);

  // Reset form when closing
  useEffect(() => {
    if (!showForm) {
      setFormData({
        name: '',
        targetAmount: '',
        currentAmount: '',
        targetDate: '',
        category: 'Other',
        priority: 'Medium',
        notes: ''
      });
      setEditMode(false);
      setEditId(null);
    }
  }, [showForm]);

  // Fetch user-specific savings goals on mount
  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      try {
        const goals = await getSavingsGoals();
        setSavingsGoals(goals || []);
        setError(null);
      } catch (err) {
        setError('Failed to load savings goals.');
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const goalData = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount) || 0,
      _id: editMode ? editId : Date.now().toString(),
      isCompleted: false
    };
    
    if (editMode) {
      setSavingsGoals(goals => goals.map(goal => 
        goal._id === editId ? { ...goal, ...goalData } : goal
      ));
    } else {
      setSavingsGoals(goals => [...goals, goalData]);
    }
    
    setShowForm(false);
  };

  const handleEdit = (goal) => {
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      targetDate: new Date(goal.targetDate).toISOString().split('T')[0],
      category: goal.category,
      priority: goal.priority,
      notes: goal.notes || ''
    });
    setEditMode(true);
    setEditId(goal._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this savings goal?')) {
      setSavingsGoals(goals => goals.filter(goal => goal._id !== id));
    }
  };

  const handleContribution = async (goal, amount) => {
    const newAmount = goal.currentAmount + amount;
    setSavingsGoals(goals => goals.map(g => 
      g._id === goal._id ? { ...g, currentAmount: newAmount, isCompleted: newAmount >= g.targetAmount } : g
    ));
  };

  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining
  const calculateDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate monthly contribution needed
  const calculateMonthlyContribution = (goal) => {
    const today = new Date();
    const targetDate = new Date(goal.targetDate);
    const monthsRemaining = (targetDate.getFullYear() - today.getFullYear()) * 12 + 
                           (targetDate.getMonth() - today.getMonth());
    
    if (monthsRemaining <= 0) return 0;
    
    const amountNeeded = goal.targetAmount - goal.currentAmount;
    return amountNeeded / monthsRemaining;
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Emergency Fund': '🚨',
      'Vacation': '✈️',
      'Education': '📚',
      'Home': '🏠',
      'Vehicle': '🚗',
      'Retirement': '💰',
      'Wedding': '💒',
      'Electronics': '💻',
      'Other': '🎯'
    };
    return icons[category] || '🎯';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'white',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{
              margin: '0 0 0.5rem 0',
              fontSize: '2.5rem',
              fontWeight: '700',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              💎 Your Savings Goals
            </h1>
            <p style={{
              margin: 0,
              opacity: 0.9,
              fontSize: '1.1rem'
            }}>
              Turn your dreams into achievable financial milestones
            </p>
          </div>
          
          <button 
            onClick={() => setShowForm(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>+</span>
            Add New Goal
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          
          {/* Savings Tips */}
          {showTips && savingsTips.length > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '2rem',
              position: 'relative',
              color: 'white',
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
            }}>
              <button 
                onClick={() => setShowTips(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                ×
              </button>
              
              <h3 style={{
                margin: '0 0 1rem 0',
                fontSize: '1.3rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                💡 Smart Savings Tips
              </h3>
              
              <div style={{
                display: 'grid',
                gap: '0.75rem'
              }}>
                {savingsTips.map((tip, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    padding: '0.5rem 0'
                  }}>
                    <span style={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 'bold',
                      minWidth: '20px'
                    }}>
                      {index + 1}.
                    </span>
                    <span style={{ lineHeight: '1.5' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Form Modal */}
          {showForm && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '2rem',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}>
                <h2 style={{
                  margin: '0 0 1.5rem 0',
                  color: '#1f2937',
                  fontSize: '1.8rem',
                  fontWeight: '700'
                }}>
                  {editMode ? '✏️ Edit Savings Goal' : '🎯 Create New Savings Goal'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Goal Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#f9fafb'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.backgroundColor = '#f9fafb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>Target Amount (KSH)</label>
                      <input 
                        type="number" 
                        name="targetAmount" 
                        value={formData.targetAmount} 
                        onChange={handleChange} 
                        min="1" 
                        step="0.01" 
                        required 
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          backgroundColor: '#f9fafb'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.backgroundColor = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.backgroundColor = '#f9fafb';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>Current Amount (KSH)</label>
                      <input 
                        type="number" 
                        name="currentAmount" 
                        value={formData.currentAmount} 
                        onChange={handleChange} 
                        min="0" 
                        step="0.01" 
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          backgroundColor: '#f9fafb'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.backgroundColor = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.backgroundColor = '#f9fafb';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Target Date</label>
                    <input 
                      type="date" 
                      name="targetDate" 
                      value={formData.targetDate} 
                      onChange={handleChange} 
                      required 
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#f9fafb'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.backgroundColor = '#f9fafb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>Category</label>
                      <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          backgroundColor: '#f9fafb'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.backgroundColor = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.backgroundColor = '#f9fafb';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="Emergency Fund">🚨 Emergency Fund</option>
                        <option value="Vacation">✈️ Vacation</option>
                        <option value="Education">📚 Education</option>
                        <option value="Home">🏠 Home</option>
                        <option value="Vehicle">🚗 Vehicle</option>
                        <option value="Retirement">💰 Retirement</option>
                        <option value="Wedding">💒 Wedding</option>
                        <option value="Electronics">💻 Electronics</option>
                        <option value="Other">🎯 Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>Priority</label>
                      <select 
                        name="priority" 
                        value={formData.priority} 
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          backgroundColor: '#f9fafb'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.backgroundColor = 'white';
                          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.backgroundColor = '#f9fafb';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="Low">🟢 Low</option>
                        <option value="Medium">🟡 Medium</option>
                        <option value="High">🔴 High</option>
                      </select>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: '#374151'
                    }}>Notes (Optional)</label>
                    <textarea 
                      name="notes" 
                      value={formData.notes} 
                      onChange={handleChange} 
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#f9fafb',
                        resize: 'vertical'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.backgroundColor = '#f9fafb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'flex-end'
                  }}>
                    <button 
                      type="button" 
                      onClick={() => setShowForm(false)}
                      style={{
                        padding: '12px 24px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backgroundColor: 'white',
                        color: '#6b7280'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.backgroundColor = '#f9fafb';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.backgroundColor = 'white';
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      style={{
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.39)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px 0 rgba(102, 126, 234, 0.5)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 14px 0 rgba(102, 126, 234, 0.39)';
                      }}
                    >
                      {editMode ? 'Update Goal' : 'Create Goal'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Goals Grid */}
          {savingsGoals.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              borderRadius: '20px',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
              <p style={{
                fontSize: '1.2rem',
                color: '#6b7280',
                margin: 0,
                fontWeight: '500'
              }}>
                You don't have any savings goals yet. Click "Add New Goal" to get started on your financial journey!
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {savingsGoals.map(goal => {
                const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
                const daysRemaining = calculateDaysRemaining(goal.targetDate);
                const monthlyContribution = calculateMonthlyContribution(goal);
                
                return (
                  <div 
                    key={goal._id} 
                    style={{
                      background: goal.isCompleted 
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      borderRadius: '20px',
                      padding: '1.5rem',
                      boxShadow: goal.isCompleted 
                        ? '0 20px 40px -10px rgba(16, 185, 129, 0.4)'
                        : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      border: goal.isCompleted 
                        ? 'none'
                        : '1px solid rgba(229, 231, 235, 0.8)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = goal.isCompleted 
                        ? '0 25px 50px -10px rgba(16, 185, 129, 0.6)'
                        : '0 20px 40px -10px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = goal.isCompleted 
                        ? '0 20px 40px -10px rgba(16, 185, 129, 0.4)'
                        : '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    {/* Decorative background pattern */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100px',
                      height: '100px',
                      background: goal.isCompleted 
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(102, 126, 234, 0.05)',
                      borderRadius: '50%',
                      transform: 'translate(30px, -30px)'
                    }} />
                    
                    {/* Goal Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: '0 0 0.5rem 0',
                          fontSize: '1.3rem',
                          fontWeight: '700',
                          color: goal.isCompleted ? 'white' : '#1f2937',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          {getCategoryIcon(goal.category)} {goal.name}
                        </h3>
                        <div style={{
                          display: 'inline-block',
                          background: goal.isCompleted 
                            ? 'rgba(255, 255, 255, 0.2)'
                            : `${getPriorityColor(goal.priority)}15`,
                          color: goal.isCompleted 
                            ? 'white'
                            : getPriorityColor(goal.priority),
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          border: goal.isCompleted 
                            ? '1px solid rgba(255, 255, 255, 0.3)'
                            : `1px solid ${getPriorityColor(goal.priority)}30`
                        }}>
                          {goal.priority} Priority
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Section */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          color: goal.isCompleted ? 'rgba(255, 255, 255, 0.9)' : '#6b7280'
                        }}>
                          Progress
                        </span>
                        <span style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: goal.isCompleted ? 'white' : '#1f2937'
                        }}>
                          {progress}%
                        </span>
                      </div>
                      
                      <div style={{
                        width: '100%',
                        height: '12px',
                        backgroundColor: goal.isCompleted 
                          ? 'rgba(255, 255, 255, 0.2)'
                          : '#e5e7eb',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: `${progress}%`,
                          height: '100%',
                          background: goal.isCompleted 
                            ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 1) 100%)'
                            : 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '6px',
                          transition: 'width 0.6s ease',
                          position: 'relative'
                        }}>
                          {progress > 0 && (
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                              animation: 'shimmer 2s infinite'
                            }} />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Amount Information */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        background: goal.isCompleted 
                          ? 'rgba(255, 255, 255, 0.1)'
                          : '#f8fafc',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: goal.isCompleted 
                          ? '1px solid rgba(255, 255, 255, 0.2)'
                          : '1px solid #e2e8f0'
                      }}>
                        <div style={{
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: goal.isCompleted ? 'rgba(255, 255, 255, 0.8)' : '#64748b',
                          marginBottom: '4px'
                        }}>
                          Current
                        </div>
                        <div style={{
                          fontSize: '1.2rem',
                          fontWeight: '700',
                          color: goal.isCompleted ? 'white' : '#1e293b'
                        }}>
                          ${goal.currentAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      
                      <div style={{
                        background: goal.isCompleted 
                          ? 'rgba(255, 255, 255, 0.1)'
                          : '#f8fafc',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: goal.isCompleted 
                          ? '1px solid rgba(255, 255, 255, 0.2)'
                          : '1px solid #e2e8f0'
                      }}>
                        <div style={{
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: goal.isCompleted ? 'rgba(255, 255, 255, 0.8)' : '#64748b',
                          marginBottom: '4px'
                        }}>
                          Target
                        </div>
                        <div style={{
                          fontSize: '1.2rem',
                          fontWeight: '700',
                          color: goal.isCompleted ? 'white' : '#1e293b'
                        }}>
                          ${goal.targetAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Date Information */}
                    <div style={{
                      background: goal.isCompleted 
                        ? 'rgba(255, 255, 255, 0.1)'
                        : '#f1f5f9',
                      padding: '1rem',
                      borderRadius: '12px',
                      marginBottom: '1rem',
                      border: goal.isCompleted 
                        ? '1px solid rgba(255, 255, 255, 0.2)'
                        : '1px solid #e2e8f0'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: goal.isCompleted ? 'rgba(255, 255, 255, 0.8)' : '#64748b',
                            marginBottom: '4px'
                          }}>
                            Target Date
                          </div>
                          <div style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: goal.isCompleted ? 'white' : '#1e293b'
                          }}>
                            {formatDate(goal.targetDate)}
                          </div>
                        </div>
                        
                        <div style={{ textAlign: 'right' }}>
                          {daysRemaining > 0 ? (
                            <div style={{
                              background: goal.isCompleted 
                                ? 'rgba(255, 255, 255, 0.2)'
                                : '#dbeafe',
                              color: goal.isCompleted ? 'white' : '#1e40af',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              {daysRemaining} days left
                            </div>
                          ) : (
                            <div style={{
                              background: '#fef2f2',
                              color: '#dc2626',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              Overdue
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Monthly Contribution Suggestion */}
                    {!goal.isCompleted && monthlyContribution > 0 && (
                      <div style={{
                        background: 'linear-gradient(135deg, #f59e0b15 0%, #f59e0b05 100%)',
                        border: '1px solid #f59e0b30',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: '#92400e',
                          marginBottom: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          💡 Suggested Monthly Contribution
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: '#d97706'
                        }}>
                          ${monthlyContribution.toFixed(2)}
                        </div>
                      </div>
                    )}
                    
                    {/* Notes */}
                    {goal.notes && (
                      <div style={{
                        background: goal.isCompleted 
                          ? 'rgba(255, 255, 255, 0.1)'
                          : '#f8fafc',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1rem',
                        border: goal.isCompleted 
                          ? '1px solid rgba(255, 255, 255, 0.2)'
                          : '1px solid #e2e8f0'
                      }}>
                        <div style={{
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: goal.isCompleted ? 'rgba(255, 255, 255, 0.8)' : '#64748b',
                          marginBottom: '4px'
                        }}>
                          Notes
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: goal.isCompleted ? 'rgba(255, 255, 255, 0.9)' : '#374151',
                          lineHeight: '1.5'
                        }}>
                          {goal.notes}
                        </div>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    {goal.isCompleted ? (
                      <div style={{
                        textAlign: 'center',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}>
                        <div style={{
                          fontSize: '1.5rem',
                          marginBottom: '0.5rem'
                        }}>
                          🎉
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: 'white'
                        }}>
                          Goal Completed!
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                          marginTop: '0.25rem'
                        }}>
                          Congratulations on reaching your target!
                        </div>
                      </div>
                    ) : (
                      <div>
                        {/* Quick Contribution Buttons */}
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                          marginBottom: '1rem'
                        }}>
                          {[10, 50, 100].map(amount => (
                            <button
                              key={amount}
                              onClick={() => handleContribution(goal, amount)}
                              style={{
                                flex: 1,
                                padding: '10px',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
                              }}
                            >
                              +${amount}
                            </button>
                          ))}
                        </div>
                        
                        {/* Edit and Delete Buttons */}
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem'
                        }}>
                          <button
                            onClick={() => handleEdit(goal)}
                            style={{
                              flex: 1,
                              padding: '10px',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              border: 'none',
                              borderRadius: '10px',
                              color: 'white',
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                            }}
                          >
                            ✏️ Edit
                          </button>
                          
                          <button
                            onClick={() => handleDelete(goal._id)}
                            style={{
                              flex: 1,
                              padding: '10px',
                              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                              border: 'none',
                              borderRadius: '10px',
                              color: 'white',
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)';
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* Add CSS animation for shimmer effect */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SavingsGoals;